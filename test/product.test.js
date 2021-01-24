const { gql } = require('apollo-server');
const createTestServer = require('./testserver');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const dummyPengrajin = {
  firstName: 'dummy',
  lastName: 'pengrajin',
  email: 'user@personal.tes',
  password: '123456',
  role: 'pengrajin',
};

const dummyAnggota = {
  firstName: 'dummy2',
  lastName: 'anggota',
  email: 'dummy@personal.tes',
  password: '123456',
  role: 'anggota',
};

const dummyOffice = {
  address: 'Pajajaran bogor',
  latitude: -6.5945,
  longitude: 106.789,
  phoneNumber: '+62182718728',
  category: 'kantor-pengrajin',
};
const dummyProduct = {
  name: 'sandal waria',
  price: 195000,
  category: 'sandal',
  stock: 10,
  picture: 'https://s1.bukalapak.com/img/1755826719/large/Sandal_Jepit_Wanita___Sendal_Wedges_Panama___Chloe_Dark_Red.jpg'
}
const dummyEditProduct = {
  name: 'sandal',
  price: 95000,
  category: 'sendal',
  stock: 4,
  picture: 'https://s1.bukalapak.com/img/1755826719/large/Sandal_Jepit_Wanita___Sendal_Wedges_Panama___Chloe_Dark_Red.jpg'
}

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

const FIND_ALL_PRODUCT = gql`
  query findAllProducts {
    products {
      id
      OfficeId
      name
      price
      category
      stock
      picture
      Office {
        UserId
        id
        UserId
        address
        latitude
        longitude
        phoneNumber
        category
        User {
          id
          firstName
          lastName
          role
          email
        }
      }
    }
  }
`;

const FAIL_FIND_ALL_PRODUCT = gql`
  query findAllProducts {
    products {
      ids
      OfficeId
      name
      price
      category
      stock
      picture
      Office {
        UserId
        id
        UserId
        address
        latitude
        longitude
        phoneNumber
        category
        User {
          id
          firstName
          lastName
          role
          email
        }
      }
    }
  }
`;

const FIND_PRODUCT_BY_ID = gql`
  query productById($id: ID!) {
    product(id: $id) {
      id
      OfficeId
      name
      price
      category
      stock
      picture
      Office {
        id
        UserId
        address
        latitude
        longitude
        phoneNumber
        category
        User {
          id
          firstName
          lastName
          role
          email
        }
      }
    }
  }
`;

const ADD_OFFICE = gql`
  mutation addOffice($inputOffice: OfficeData) {
    addOffice(data: $inputOffice) {
      address
      latitude
      longitude
      phoneNumber
      category
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation addProduct($inputProduct: ProductData) {
    addProduct(data: $inputProduct) {
      id
      OfficeId
      name
      price
      category
      stock
      picture
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation editProduct($inputId: ID!, $editData: ProductData) {
    editProduct(id: $inputId, data: $editData) {
      id
      OfficeId
      name
      price
      category
      stock
      picture
    }
  }
`

const DELETE_PRODUCT = gql`
  mutation deleteProduct($inputId: ID!) {
    deleteProduct(id: $inputId) {
      msg
    }
  }
`
let tokenDummyPengrajin
let tokenDummyAnggota
let ProductId;



beforeAll(async () => {
  const { mutate } = createTestServer();

  const dataPengrajin = await mutate({
    query: REGISTER_USER,
    variables: {
      inputUser: dummyPengrajin,
    },
  });
  const dataAnggota = await mutate({
    query: REGISTER_USER,
    variables: {
      inputUser: dummyAnggota,
    },
  });
  if (dataPengrajin) {
    const resLogin = await mutate({
      query: LOGIN_USER,
      variables: {
        email: dummyPengrajin.email,
        password: dummyPengrajin.password,
      },
    });
    tokenDummyPengrajin = resLogin.data.loginUser.token;
  }

  if (dataAnggota) {
    const resLoginAnggota = await mutate({
      query: LOGIN_USER,
      variables: {
        email: dummyAnggota.email,
        password: dummyAnggota.password
      }
    })
    tokenDummyAnggota = resLoginAnggota.data.loginUser.token
  }
  {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token: tokenDummyPengrajin,
        },
      },
    });

    const resOffice = await mutate({
      query: ADD_OFFICE,
      variables: {
        inputOffice: dummyOffice,
      },
    });

    // console.log(resOffice, '<<<< office');
  }
});

afterAll(async () => {
  await queryInterface.bulkDelete('Users');
  await queryInterface.bulkDelete('Offices');
  await queryInterface.bulkDelete('Products');
});

const { query } = createTestServer();
describe('product tests', () => {
  test('should succeed create a product', async () => {
    {
      const { mutate } = createTestServer({
        req: {
          headers: {
            token: tokenDummyPengrajin
          }
        }
      })
      const resProduct = await mutate({
        query: CREATE_PRODUCT,
        variables: {
          inputProduct: dummyProduct
        }
      })
      ProductId = resProduct.data.addProduct.id
      // console.log(resProduct.data, '<<<<<<<< res product')
      expect(resProduct.data).toHaveProperty('addProduct')
    }
  });

  test('should succeed get all products', async () => {
    const res = await query({ query: FIND_ALL_PRODUCT });
    expect(res.data).toHaveProperty('products');
  });

  test('should succeed get products by id', async () => {
    const res = await query({
      query: FIND_PRODUCT_BY_ID,
      variables: {
        id: ProductId,
      },
    });
    expect(res.data).toHaveProperty('product');
  });

  test('should failed get products by id', async () => {
    const res = await query({
      query: FIND_PRODUCT_BY_ID,
    });
    expect(res.data).toBeUndefined();
  });

  test('should succeed edit products data', async () => {
    {
      const { mutate } = createTestServer({
        req: {
          headers: {
            token: tokenDummyPengrajin
          }
        }
      })
      const resEditProduct = await mutate({
        query: EDIT_PRODUCT,
        variables: {
          inputId: ProductId,
          editData: dummyEditProduct
        }
      })
      console.log(resEditProduct, '<<<<<<< res edit')
      expect(resEditProduct.data).toHaveProperty('editProduct')
    }
  })
  test('should failed edit product data', async () => {
    {
      const { mutate } = createTestServer({
        req: {
          headers: {
            token: tokenDummyAnggota
          }
        }
      })
      const resEditFailed = await mutate({
        query: EDIT_PRODUCT,
        variables: {
          inputId: ProductId,
          editData: dummyEditProduct
        }
      })
      // console.log(ProductId, '<<< ini idnya loh >>>')
      // console.log(resEditFailed, '<<< ini edit loh >>>')

    }
  })
  test('should failed delete products id not found return unauthorize', async () => {
    {
      const { mutate } = createTestServer({
        req: {
          headers: {
            token: tokenDummyPengrajin
          }
        }
      })
      const resDeleteProduct = await mutate({
        query: DELETE_PRODUCT,
        variables: {
          inputId: 999999999
        }
      })
      // console.log(resDeleteProduct, '<<<< deleted failed >>>>')
      expect(resDeleteProduct.data.deleteProduct).toBeNull()
      // expect(resDeleteProduct.data.deleteProduct).toEqual({"msg": "succes delete product"})
    }
  })
  test('should failed delete products id with unauthorized', async () => {
    {
      const { mutate } = createTestServer({
        req: {
          headers: {
            token: tokenDummyAnggota
          }
        }
      })
      const resDeleteProduct = await mutate({
        query: DELETE_PRODUCT,
        variables: {
          inputId: ProductId
        }
      })
      console.log(resDeleteProduct, '<<<< deleted failed >>>>')
      // expect(resDeleteProduct.data.deleteProduct).toBeNull()
      // expect(resDeleteProduct.data.deleteProduct).toEqual({"msg": "succes delete product"})
    }
  })
  test('should succeed delete products', async () => {
    {
      const { mutate } = createTestServer({
        req: {
          headers: {
            token: tokenDummyPengrajin
          }
        }
      })
      const resDeleteProduct = await mutate({
        query: DELETE_PRODUCT,
        variables: {
          inputId: ProductId
        }
      })
      // console.log(resDeleteProduct, '<<<< deleted >>>>')
      expect(resDeleteProduct.data.deleteProduct).toEqual({"msg": "succes delete product"})
    }
  })
});
