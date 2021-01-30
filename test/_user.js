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
  query findById {
    user {
      id
      firstName
      lastName
      email
      role
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

const EDIT_USER = gql`
  mutation editUser($inputUser: UserData) {
    editUser(data: $inputUser) {
      id
      firstName
      lastName
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      msg
    }
  }
`;

let dummyToken = null;
let dummyId = null;
afterAll(async () => {
  return (emptyTheTable = await queryInterface.bulkDelete('Users', {
    email: 'user@personal.tes',
  }));
});

module.exports = () => {
  return describe('Testing User', () => {
    describe('User Register', () => {
      const { query, mutate } = createTestServer();
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
      const { query, mutate } = createTestServer();
      test('should return access token on successfull login', async () => {
        const res = await mutate({
          query: LOGIN_USER,
          variables: {
            email: 'user@personal.tes',
            password: '123456',
          },
        });
        dummyToken = res.data.loginUser.token;
        expect(res.data.loginUser).toHaveProperty('token');
      });
      test('should return invalid email/password on invalid input', async () => {
        const res = await mutate({
          query: LOGIN_USER,
          variables: {
            email: 'user@personal.tes',
            password: '1234568',
          },
        });
        expect(res.errors[0].message).toBe('invalid email/password');
      });
    });

    describe('Get All User Data', () => {
      test('should return array of users on success', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: dummyToken,
            },
          },
        });
        const res = await query({
          query: FIND_ALL_USER,
        });
        expect(res.data).toHaveProperty('users');
      });
      test('should be asking for login without token', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: '',
            },
          },
        });
        const res = await query({
          query: FIND_ALL_USER,
        });
        expect(res.errors[0].message).toBe('please login ');
      });
    });

    describe('Get User By ID', () => {
      test('should return array of users on success', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: dummyToken,
            },
          },
        });
        const res = await query({
          query: FIND_USER_BY_ID,
        });
        dummyId = res.data.user.id;
        expect(res.data).toHaveProperty('user');
      });
      test('should be asking for login without token', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: '',
            },
          },
        });
        const res = await query({
          query: FIND_USER_BY_ID,
        });
        expect(res.errors[0].message).toBe('please login ');
      });
      test('should be asking for login without token', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpbzRAbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6ImFuZ2dvdGEiLCJpYXQiOjE2MTE0NjYxOTd9.RE-SgiV0PpRv9VUF3Vxy-emzKqb2udUjLrMu30Psvpo',
            },
          },
        });
        const res = await query({
          query: FIND_USER_BY_ID,
        });
        // console.log(res);
        expect(res.errors[0]).toHaveProperty('message')
      });
    });

    describe('USER EDIT', () => {
      test('should return new data on success', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: dummyToken,
            },
          },
        });
        const dummyUserPersonal = {
          firstName: 'User',
          lastName: 'Edited',
        };
        const res = await query({
          query: EDIT_USER,
          variables: {
            inputUser: dummyUserPersonal,
          },
        });
        expect(res.data).toHaveProperty('editUser');
      });

      test('should return error if new data invalid', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: dummyToken,
            },
          },
        });
        const dummyUserPersonal = {
          firstName: 'User',
          lastName: 'Edited',
          email: 'tesedit.com',
        };
        const res = await query({
          query: EDIT_USER,
          variables: {
            inputUser: dummyUserPersonal,
          },
        });
        expect(res.errors[0].message).toBe(
          'Validation error: harus berupa email'
        );
      });
    });

    describe('USER DELETE', () => {
      test('should return success mesage on success', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: dummyToken,
            },
          },
        });
        const res = await query({
          query: DELETE_USER,
        });
        expect(res.data.deleteUser.msg).toBe('Succes delete Data');
      });
      test('should return error if no data', async () => {
        const { query } = createTestServer({
          req: {
            headers: {
              token: dummyToken,
            },
          },
        });
        const res = await query({
          query: DELETE_USER,
        });
        expect(res.data.deleteUser).toBe(null);
      });
    });
  });
};
