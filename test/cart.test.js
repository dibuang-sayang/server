const gql = require('graphql-tag');
const createTestServer = require('./testserver');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

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

let tokenDummy

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
  
  {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token : tokenDummy
        }
      }
    })
    const resOffice =  await mutate({
      query: ADD_OFFICE,
      variables: {
        inputOffice : dummyOffice
      }
    })

    console.log(resOffice, 'adasd');
  }

})

afterAll(async () => {
  await queryInterface.bulkDelete('Users', {
    email: 'user@personal.tes',
  });
});


describe('add cart', () => {
  test('should return success', async (done) => {
    console.log(tokenDummy, 'tokenn');
    done()
  })
})