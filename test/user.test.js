const gql = require('graphql-tag');
const createTestServer = require('./testserver');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const FIND_ALL_USER = gql`
  query findAllUser {
    users {
      firstName
      lastName
      email
    }
  }
`;

const FIND_USER_BY_ID = gql`
  query findById($id: ID!) {
    user(id: $id) {
      firstName
    }
  }
`;

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

const { query, mutate } = createTestServer();
afterAll(async () => {
  const emptyTheTable = await queryInterface.bulkDelete('Users', {
    email: 'user@personal.tes',
  });
});

describe('Testing User', () => {
  describe('User Register', () => {
    test('should return user data on success', async () => {
      const dummyUserPersonal = {
        firstName: 'User',
        lastName: 'Personal',
        password: '123456',
        role: 'anggota',
        email: 'user@personal.tes',
      };
      const res = await mutate({
        query: REGISTER_USER,
        variables: {
          inputUser: dummyUserPersonal,
        },
      });
      expect(res.data).toHaveProperty('register');
    });

    test('should return error on invalid role', async () => {
      const dummyUserPersonal = {
        firstName: 'User',
        lastName: 'Personal',
        password: '123456',
        role: '',
        email: 'user2@personal.tes',
      };
      const res = await mutate({
        query: REGISTER_USER,
        variables: {
          inputUser: dummyUserPersonal,
        },
      });
      expect(res.errors[0].message).toBe('Validation error: role salah');
    });

    test('should return error on duplicate email', async () => {
      const dummyUserPersonal = {
        firstName: 'User',
        lastName: 'Personal',
        password: '123456',
        role: 'anggota',
        email: 'user@personal.tes',
      };
      const res = await mutate({
        query: REGISTER_USER,
        variables: {
          inputUser: dummyUserPersonal,
        },
      });
      expect(res.errors[0].message).toBe('email sudah dipakai');
    });

    test('should return error on invalid email', async () => {
      const dummyUserPersonal = {
        firstName: 'User',
        lastName: 'Personal',
        password: '123456',
        role: 'anggota',
        email: 'userpersonal.tes',
      };
      const res = await mutate({
        query: REGISTER_USER,
        variables: {
          inputUser: dummyUserPersonal,
        },
      });
      expect(res.errors[0].message).toBe(
        'Validation error: harus berupa email'
      );
    });
  });

  describe('User Login', () => {
    test('should return access token on successfull login', async () => {
      const res = await mutate({
        query: LOGIN_USER,
        variables: {
          email: 'user@personal.tes',
          password: '123456',
        },
      });
      console.log(res, 'dari tes');
      expect(res).toHaveProperty('token');
    });
  });
});

// describe('queries', () => {
//   test('sucess get all', async () => {
//     const res = await query({ query: FIND_ALL_USER });
//     // console.log(res.data.users);
//     expect(res.data).toHaveProperty('users');
//   });

//   test('get user by id', async () => {
//     const res = await query({
//       query: FIND_USER_BY_ID,
//       variables: {
//         id: 1,
//       },
//     });
//     console.log(res);
//     expect(res.data).toHaveProperty('user');
//   });
// });
