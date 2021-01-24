const gql = require('graphql-tag');
const createTestServer = require('./testserver');
const { sequelize, Cart } = require('../models');
const { queryInterface } = sequelize;
const {Office} = require('../models')


const REGISTER_USER = gql`
  mutation register($inputUser: UserData) {
    register(data: $inputUser) {
      firstName
      lastName
      email
      password
      role
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

const ADD_OFFICE = gql`
  mutation addOffice($inputOffice: OfficeData){
    addOffice(data: $inputOffice){
      address
      latitude
      longitude
      phoneNumber
      category
    }
  }
`

const ADD_PRODUCT = gql`
  mutation addProduct($inputProduct: ProductData){
    addProduct(data: $inputProduct){
      id
      name
      price
      category
      stock
      picture
    }
  }
`

const ADD_CART = gql`
  mutation addCart($inputCart: CartData){
    addCart(data: $inputCart){
      id
      UserId
      ProductId
      quantity
      status
    }
  }
`

const FIND_CART_BY_ID = gql`
  query cart($id: ID!){
    cart(id:$id){
      id
      UserId
      ProductId
      quantity
      status
    }
  }
`

const FIND_ALL_CART = gql`
  query carts{
    carts{
      UserId
      ProductId
      quantity
      status
    }
  }
`

const EDIT_CART = gql`
  mutation editCart($id: ID!  $dataEditCart: CartData){
    editCart(id: $id  data: $dataEditCart){
      UserId
      ProductId
      quantity
      status
    }
  }
  `

const CHECKOUT = gql`
  query checkOut {
    checkOut { msg }
  }
`
const DELETE_CART = gql`
  mutation deleteCart($id: ID!){
    deleteCart(id: $id){
      msg
    }
  }
`

let tokenDummy
let createdProduct

beforeAll (async () => {
  const { mutate } = createTestServer()

  const dummyUserPersonal = {
    firstName: 'User',
    lastName: 'Personal',
    password: '123456',
    role: 'pengrajin',
    email: 'user@personal.tes',
  };

  const dummyOffice = {
    address: "disana",
    latitude: 12345,
    longitude: 123456,
    phoneNumber: "123567",
    category: "kantor-pengepul"
  }

  const dummyProduct = {
    name: "test-product",
    price: 10000,
    category: "barang-mentah",
    stock: 5,
    picture: "test-picture"
  }

  //REGISTER
  const res = await mutate ({
    query: REGISTER_USER,
    variables: {
      inputUser: dummyUserPersonal,
    },
  });
  //LOGIN
  if(res){
    const resLogin = await mutate({
      query: LOGIN_USER,
      variables: {
        email: dummyUserPersonal.email,
        password: dummyUserPersonal.password
      },
    })
    tokenDummy = resLogin.data.loginUser.token

  }
  //CRATE OFFICE
  {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        },
        models: {
          Office
        }
      }
    })
    const resOffice =  await mutate({
      query: ADD_OFFICE,
      variables: {
        inputOffice : dummyOffice
      }
    })
  }
  //CREATE PRODUCT
  {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      }
    })

    const resProduct = await mutate({
      query: ADD_PRODUCT,
      variables: {
        inputProduct: dummyProduct
      }
    })
    // console.log(resProduct, 'asdsdasd');
    if(resProduct){
      createdProduct = resProduct.data.addProduct;
    }
  }
})

afterAll(async () => {
  await queryInterface.bulkDelete('Users', {
    email: 'user@personal.tes',
  });
  await queryInterface.bulkDelete('Offices', null, {})
  await queryInterface.bulkDelete('Products', null, {})
  await queryInterface.bulkDelete('Carts', null, {})

});

describe('add cart', () => {
  let testId
  test('should return success', async (done) => {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      },
      model: {
        Cart
      }
    })
    const resCart = await mutate({
      query: ADD_CART,
      variables: {
        inputCart: {
          ProductId: +createdProduct.id,
          quantity: 4,
          status: "pending"
        }
      }
    })
    if(resCart){
      testId = resCart.data.addCart.id
    }
    expect(resCart.data.addCart).toHaveProperty('status') 
    done()
  })

  test('success find by id', async (done) => {
    const { query } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      },
    })

    const resFindCart = await query({
      query: FIND_CART_BY_ID,
      variables: {
        id: +testId
      }
    })
    // console.log(resFindCart);
    expect(resFindCart.data.cart).toHaveProperty('quantity')
    done()
  })

  test('fail find by id', async (done) => {
    const { query } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      },
    })

    const resFindCart = await query({
      query: FIND_CART_BY_ID,
      variables: {
        id: +testId+1
      }
    })
    expect(resFindCart.errors[0].message).toBe('data not found')
    done()
  })
  
  test('find all cart',  async (done) => {
    const { query } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      },
    })
    const resAllCarts = await query({
      query: FIND_ALL_CART
    })
    // console.log(resAllCarts.data, 'ini all');
    expect(resAllCarts.data).toHaveProperty('carts')
    done()
  })

  test('success add into existing cart', async (done) => {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        },
        model: {
          Cart
        }
      }
    })
    const resCart = await mutate({
      query: ADD_CART,
      variables: {
        inputCart: {
          ProductId: +createdProduct.id,
          quantity: 1,
          status: "pending"
        }
      }
    })
    // console.log(resCart, 'ini cart');
    expect(resCart.data.addCart.quantity).toBe(5)
    done()
  })

  test('success edit a cart', async (done) => {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        },
      }
    })

    const resEditCart = await mutate({
      query: EDIT_CART,
      variables: {
        id: +testId,
        dataEditCart:{
          status: "paid"
        }
      }
    })
    expect(resEditCart.data.editCart.status).toBe('paid')
    done()
  })

  test('fail edit a cart', async (done) => {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        },
      }
    })
    const resEditCartFail = await mutate({
      query: EDIT_CART,
      variables: {
        id: +testId,
        dataEditCart:{
          quantity: 100
        }
      }
    })
    // console.log(resEditCartFail, 'ini res edit');
    expect(resEditCartFail.errors[0].message).toBe('terlalu banyak ')
    done()
  })

  test('failed add into existing cart', async (done) => {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      }
    })
    const resCart = await mutate({
      query: ADD_CART,
      variables: {
        inputCart: {
          ProductId: +createdProduct.id,
          quantity: 1,
          status: "pending"
        }
      }
    })
    // console.log(resCart);
    expect(resCart.errors[0].message).toBe('terlalu banyak coy')
    done()
  })

  test('success checkout', async (done) => {
    const { query } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      }
    })
    const resCheckout = await query({
      query: CHECKOUT
    })
    // console.log(resCheckout);
    expect(resCheckout.data.checkOut.msg).toBe('succes CheckOut')
    done()
  })

  test('delete fail cart', async (done) => {
    const { query } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      }
    })
    // console.log(createdProduct.id, 'adsadasadsad');
    const resDeleteCart = await query({
      query: DELETE_CART,
      variables: {
        id: +createdProduct.id
      }
    })
    // console.log(resDeleteCart, "test");
    expect(resDeleteCart.errors[0].message).toBe("data not found")
    done()
  })

  test('sucess ya allah', async (done) => {
    const { query } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      }
    })
    // console.log(createdProduct.id, 'adsadasadsad');
    const resDeleteCart = await query({
      query: DELETE_CART,
      variables: {
        id: +testId
      }
    })
    console.log(resDeleteCart, "test");
    expect(resDeleteCart.data.deleteCart.msg).toBe("succes delete data")
    done()
  })
})