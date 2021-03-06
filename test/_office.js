const gql = require('graphql-tag');
const createTestServer = require('./testserver');
const { sequelize } = require('../models');
const { Office } = require('../models');
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
const GET_ALL_OFFICE = gql`
  query findAllOffice {
    offices {
      id
      UserId
      address
      latitude
      longitude
      phoneNumber
      category
      User {
        firstName
        lastName
        email
        password
        role
      }
    }
  }
`;

const GET_OFFICE_BY_ID = gql`
  query findOfficeById {
    office {
      id
      UserId
      address
      latitude
      longitude
      phoneNumber
      category
      User {
        firstName
        lastName
        email
        password
        role
      }
    }
  }
`;

const EDIT_OFFICE = gql`
  mutation editOffice($data: OfficeData) {
    editOffice(data: $data) {
      id
      UserId
      address
      latitude
      longitude
      phoneNumber
      category
      User {
        firstName
        lastName
        email
        password
        role
      }
    }
  }
`;
const DELETE_OFFICE = gql`
  mutation deleteOffice {
    deleteOffice {
      msg
    }
  }
`;

let tokenDummy;
let tokenDummyOrangBiasa;

beforeAll(async () => {
  const { mutate } = createTestServer();

  const dummyUserData = {
    firstName: 'User',
    lastName: 'office',
    password: '12345',
    email: 'userPalsu@mail.com',
    role: 'pengrajin',
  };

  const dummyOrangBiasaData = {
    firstName: 'User',
    lastName: 'office',
    password: '12345',
    email: 'userBiasa@mail.com',
    role: 'anggota',
  };

  const dummyOffice = {
    address: 'disana',
    latitude: 12345,
    longitude: 123456,
    phoneNumber: '123567',
    category: 'kantor-pengepul',
  };

  //Register
  const res = await mutate({
    query: REGISTER_USER,
    variables: {
      inputUser: dummyUserData,
    },
  });

  //Register Orang Biasa
  const resOrangBiasa = await mutate({
    query: REGISTER_USER,
    variables: {
      inputUser: dummyOrangBiasaData,
    },
  });

  //Login
  const resLogin = await mutate({
    query: LOGIN_USER,
    variables: {
      email: dummyUserData.email,
      password: dummyUserData.password,
    },
  });
  tokenDummy = resLogin.data.loginUser.token;
  const resLoginOrangBiasa = await mutate({
    query: LOGIN_USER,
    variables: {
      email: dummyOrangBiasaData.email,
      password: dummyOrangBiasaData.password,
    },
  });
  tokenDummyOrangBiasa = resLoginOrangBiasa.data.loginUser.token;
  {
    const { mutate } = createTestServer({
      req: {
        headers: {
          token: tokenDummy,
        },
      },
      models: { Office },
    });

    const resOffice = await mutate({
      query: ADD_OFFICE,
      variables: {
        inputOffice: dummyOffice,
      },
    });
  }
});

afterAll(async () => {
  await queryInterface.bulkDelete('Users');

  await queryInterface.bulkDelete('Offices');
});

module.exports = () => {
  return describe('Testing Office', () => {
    // GET ALL OFFICE
    describe('GET All Office Data', () => {
      test('success get all office data', async () => {
        const { query } = createTestServer({
          models: { Office },
        });

        const officesData = await query({
          query: GET_ALL_OFFICE,
        });
        expect(officesData.data).toHaveProperty('offices');
      });

      test('failed get offices', async (done) => {
        const { query } = createTestServer({
          models: null,
        });

        const failedOffice = await query({
          query: GET_ALL_OFFICE,
        });
        expect(failedOffice.errors[0]).toHaveProperty('message');
        done();
      });
    });

    // Get office by ID
    describe('Get office by Id', () => {
      test('success get office by Id', async (done) => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: tokenDummy,
            },
          },
          models: { Office },
        });
        const officeData = await query({
          query: GET_OFFICE_BY_ID,
        });
        expect(officeData.data).toHaveProperty('office');
        done();
      });

      test('failed get data id without token ', async (done) => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: null,
            },
          },
          models: { Office },
        });
        const failedOfficeId = await query({
          query: GET_OFFICE_BY_ID,
        });
        expect(failedOfficeId.errors[0].message).toBe('please login ');
        done();
      });

      test('failed get by ID return error', async (done) => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: tokenDummy,
            },
          },
          models: null,
        });
        const failedOfficeId = await query({
          query: GET_OFFICE_BY_ID,
        });
        expect(failedOfficeId.errors[0]).toHaveProperty('message');
        done();
      });
    });

    //Edit Office
    describe('edit office ', () => {
      test('succes edit office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: tokenDummy,
            },
          },
          models: { Office },
        });

        const dummyEditOffice = {
          address: 'disini sini ',
          latitude: 12345,
          longitude: 123456,
          phoneNumber: '123567',
          category: 'kantor-pengepul',
        };

        const succesEditOffice = await mutate({
          query: EDIT_OFFICE,
          variables: {
            data: dummyEditOffice,
          },
        });

        expect(succesEditOffice.data).toHaveProperty('editOffice');
        done();
      });

      test('failed authentication edit office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: null,
            },
          },
          models: Office,
        });

        const dummyEditOffice = {
          address: 'disini sini ',
          latitude: 12345,
          longitude: 123456,
          phoneNumber: '123567',
          category: 'kantor-pengepul',
        };

        const failedAuthEditOffice = await mutate({
          query: EDIT_OFFICE,
          variables: {
            data: dummyEditOffice,
          },
        });

        expect(failedAuthEditOffice.errors[0].message).toBe('please login ');
        done();
      });

      test('failed authorization edit office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: tokenDummyOrangBiasa,
            },
          },
          models: { Office },
        });

        const dummyEditOffice = {
          address: 'disini sini ',
          latitude: 12345,
          longitude: 123456,
          phoneNumber: '123567',
          category: 'kantor-pengepul',
        };

        const failedRoleEditOffice = await mutate({
          query: EDIT_OFFICE,
          variables: {
            data: dummyEditOffice,
          },
        });

        expect(failedRoleEditOffice.errors[0].message).toBe(
          'unauthorize acces'
        );
        done();
      });

      test('failed return error edit office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: tokenDummy,
            },
          },
          models: null,
        });

        const dummyEditOffice = {
          address: 'disini sini ',
          latitude: 12345,
          longitude: 123456,
          phoneNumber: '123567',
          category: 'kantor-pengepul',
        };

        const failedRoleEditOffice = await mutate({
          query: EDIT_OFFICE,
          variables: {
            data: dummyEditOffice,
          },
        });
        expect(failedRoleEditOffice.errors[0]).toHaveProperty('message');
        done();
      });
    });
    //Delete Office
    describe('delete office ', () => {
      test('succes delete office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: tokenDummy,
            },
          },
          models: { Office },
        });

        const succesDeleteOffice = await mutate({
          query: DELETE_OFFICE,
        });

        expect(succesDeleteOffice.data.deleteOffice.msg).toBe(
          'success delete office data'
        );
        done();
      });

      test('failed authentication delete office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: null,
            },
          },
          models: { Office },
        });

        const failedAuthDeleteOffice = await mutate({
          query: DELETE_OFFICE,
        });

        expect(failedAuthDeleteOffice.errors[0].message).toBe('please login ');
        done();
      });

      test('failed authorization delete office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: tokenDummyOrangBiasa,
            },
          },
          models: { Office },
        });

        const failedRoleDeleteOffice = await mutate({
          query: DELETE_OFFICE,
        });
        expect(failedRoleDeleteOffice.errors[0].message).toBe(
          'unauthorize acces'
        );
        done();
      });

      test('failed return error delete office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: tokenDummy,
            },
          },
          models: null,
        });

        const failedRoleDeleteOffice = await mutate({
          query: DELETE_OFFICE,
        });
        expect(failedRoleDeleteOffice.errors[0]).toHaveProperty('message');
        done();
      });
    });
    //Add Office
    describe('ADD office ', () => {
      test('succes ADD office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: tokenDummy,
            },
          },
          models: { Office },
        });

        const dummyADDOffice = {
          address: 'disini sini ',
          latitude: 12345,
          longitude: 123456,
          phoneNumber: '123567',
          category: 'kantor-pengepul',
        };

        const succesADDOffice = await mutate({
          query: ADD_OFFICE,
          variables: {
            inputOffice: dummyADDOffice,
          },
        });

        expect(succesADDOffice.data).toHaveProperty('addOffice');
        done();
      });

      test('failed authentication ADD office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: null,
            },
          },
          models: Office,
        });

        const dummyADDOffice = {
          address: 'disini sini ',
          latitude: 12345,
          longitude: 123456,
          phoneNumber: '123567',
          category: 'kantor-pengepul',
        };

        const failedAuthADDOffice = await mutate({
          query: ADD_OFFICE,
          variables: {
            inputOffice: dummyADDOffice,
          },
        });
        expect(failedAuthADDOffice.errors[0].message).toBe('please login ');
        done();
      });

      test('failed authorization ADD office', async (done) => {
        const { mutate } = createTestServer({
          req: {
            headers: {
              token: tokenDummyOrangBiasa,
            },
          },
          models: { Office },
        });

        const dummyADDOffice = {
          address: 'disini sini ',
          latitude: 12345,
          longitude: 123456,
          phoneNumber: '123567',
          category: 'kantor-pengepul',
        };

        const failedRoleADDOffice = await mutate({
          query: ADD_OFFICE,
          variables: {
            inputOffice: dummyADDOffice,
          },
        });
        expect(failedRoleADDOffice.errors[0].message).toBe('unauthorize acces');
        done();
      });
    });
  });
};
