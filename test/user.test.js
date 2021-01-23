const gql = require("graphql-tag");
const createTestServer = require("./testserver");

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

const { query } = createTestServer();

describe("queries", () => {
  test("sucess get all", async () => {
    const res = await query({ query: FIND_ALL_USER });
    // console.log(res.data.users);
    expect(res.data).toHaveProperty("users");
  });

  test("get user by id", async () => {
    const res = await query({
      query: FIND_USER_BY_ID,
      variables: {
        id: 1,
      },
    });
    console.log(res);
    expect(res.data).toHaveProperty("user");
  });
});
