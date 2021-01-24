const gql = require('graphql-tag');
const createTestServer = require('./testserver');
const { sequelize } = require('../models');
const { Query } = require('pg');
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
`

const FAIL_GET_ALL_OFFICE = gql`
    query findAllOffice {
        offices {
            ids
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
`


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
`

const EDIT_OFFICE = gql`
    mutation editOffice($data : OfficeData ) {
        editOffice(data : $data) {
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
`
const DELETE_OFFICE = gql`
    mutation deleteOffice {
        deleteOffice{
            msg
        }
    }
`



let tokenDummy 
let tokenDummyOrangBiasa

beforeAll( async () => {
    const {mutate} = createTestServer()

    const dummyUserData = {
        firstName : "User",
        lastName : "office",
        password : '12345',
        email : "userPalsu@mail.com",
        role : 'pengrajin'
    }

    const dummyOrangBiasaData = {
        firstName : "User",
        lastName : "office",
        password : '12345',
        email : "userBiasa@mail.com",
        role : 'anggota'
    }

    const dummyOffice = {
        address: "disana",
        latitude: 12345,
        longitude: 123456,
        phoneNumber: "123567",
        category: "kantor-pengepul"
    }

    //Register 
    const res = await mutate({
        query : REGISTER_USER,
        variables: {
            inputUser : dummyUserData
        }
    })

    //Register Orang Biasa
    const resOrangBiasa = await mutate({
        query : REGISTER_USER,
        variables: {
            inputUser : dummyOrangBiasaData
        }
    })

    //Login
    if(res) {
        const resLogin = await mutate({
            query : LOGIN_USER,
            variables : {
                email : dummyUserData.email,
                password : dummyUserData.password
            }
        })
        // console.log(resLogin.data.loginUser.token,"<<<<<< login");
        tokenDummy = resLogin.data.loginUser.token
    }
    if(resOrangBiasa) {
        const resLoginOrangBiasa = await mutate({
            query : LOGIN_USER,
            variables : {
                email : dummyOrangBiasaData.email,
                password : dummyOrangBiasaData.password
            }
        })
        tokenDummyOrangBiasa = resLoginOrangBiasa.data.loginUser.token
    }
    {
        const { mutate } = createTestServer({
            req : {
                headers : {
                    token :  tokenDummy
                }
            }
        })

        const resOffice = await mutate({
            query : ADD_OFFICE,
            variables : {
                inputOffice : dummyOffice
            }
        })

        // console.log(resOffice);
    }
})
afterAll(async () => {
    await queryInterface.bulkDelete('Users');

    await queryInterface.bulkDelete("Offices")
  });

describe("Testing Office", () => {

    // GET ALL OFFICE
    describe("GET All Office Data" , () => {
        test('success get all office data', async () => {
            const {query} = createTestServer({
                req : {
                    headers : {
                        token : tokenDummy
                    }
                    
                }
            })

            const officesData = await query({
                query : GET_ALL_OFFICE
            })
            // console.log(officesData.data, "ini get offices ");
            expect(officesData.data).toHaveProperty("offices")
        })

        test ("failed get offices", async (done) => {
            const {query} = createTestServer()
            const failedOffice = await query({
                query : FAIL_GET_ALL_OFFICE
            })
            // console.log(failedOffice.errors[0].message, "ini fail");

            expect(failedOffice.errors[0]).toHaveProperty("message")
            done()
        })
    })





    // Get office by ID
    describe("Get office by Id" , () => {
        test("success get office by Id", async (done) => {
            const {query} = createTestServer({
                req : {
                    headers : {
                        token : tokenDummy
                    }
                    
                }
            })
            const officeData = await query({
                query : GET_OFFICE_BY_ID,
            })
            // console.log(officeData, "ini get office");
            expect(officeData.data).toHaveProperty("office")
            done()
        })

        test("failed get data without token ", async(done) => {
            const {query} = createTestServer({
                req : {
                    headers :{
                        token : null
                    }
                }
            })
            const failedOfficeId = await query({
                query : GET_OFFICE_BY_ID
            })
            // console.log(failedOfficeId, "ini get office by id Fail");
            expect(failedOfficeId.errors[0].message).toBe("please login ")
            done()
        })
        
    })

    describe("edit office ", () => {
        test("succes edit office" ,async(done) => {
            const {mutate} = createTestServer({
                req : {
                    headers : {
                        token : tokenDummy
                    }
                }
            })

            const dummyEditOffice = {
                address: "disini sini ",
                latitude: 12345,
                longitude: 123456,
                phoneNumber: "123567",
                category: "kantor-pengepul"
            }


            const succesEditOffice = await mutate({
                query : EDIT_OFFICE,
                variables : {
                    data : dummyEditOffice
                }
            })

            // console.log(succesEditOffice, "ini edit office");
            expect(succesEditOffice.data).toHaveProperty("editOffice")
            done()
        } )

        test("failed authentication edit office" ,async(done) => {
            const {mutate} = createTestServer({
                req : {
                    headers : {
                        token : null
                    }
                }
            })

            const dummyEditOffice = {
                address: "disini sini ",
                latitude: 12345,
                longitude: 123456,
                phoneNumber: "123567",
                category: "kantor-pengepul"
            }


            const failedAuthEditOffice = await mutate({
                query : EDIT_OFFICE,
                variables : {
                    data : dummyEditOffice
                }
            })

            // console.log(failedAuthEditOffice, "ini edit office");
            expect(failedAuthEditOffice.errors[0].message).toBe("please login ")
            done()
        } )


        test("failed authorization edit office" ,async(done) => {
            const {mutate} = createTestServer({
                req : {
                    headers : {
                        token : tokenDummyOrangBiasa
                    }
                }
            })

            const dummyEditOffice = {
                address: "disini sini ",
                latitude: 12345,
                longitude: 123456,
                phoneNumber: "123567",
                category: "kantor-pengepul"
            }


            const failedRoleEditOffice = await mutate({
                query : EDIT_OFFICE,
                variables : {
                    data : dummyEditOffice
                }
            })

            console.log(failedRoleEditOffice, "ini edit office fail author");
            expect(failedRoleEditOffice.errors[0].message).toBe("unauthorize acces")
            done()
        } )
    })

    describe("delete office ", () => {
        test("succes delete office" ,async(done) => {
            const {mutate} = createTestServer({
                req : {
                    headers : {
                        token : tokenDummy
                    }
                }
            })

            const succesDeleteOffice = await mutate({
                query : DELETE_OFFICE,
            })

            console.log(succesDeleteOffice.data.deleteOffice.msg, "ini delete office");
            expect(succesDeleteOffice.data.deleteOffice.msg).toBe("success delete office data")
            done()
        } )

        test("failed authentication delete office" ,async(done) => {
            const {mutate} = createTestServer({
                req : {
                    headers : {
                        token : null
                    }
                }
            })

            const failedAuthEditOffice = await mutate({
                query : DELETE_OFFICE,
            })

            // console.log(failedAuthEditOffice, "ini delete office");
            expect(failedAuthEditOffice.errors[0].message).toBe("please login ")
            done()
        } )


        test("failed authorization delete office" ,async(done) => {
            const {mutate} = createTestServer({
                req : {
                    headers : {
                        token : tokenDummyOrangBiasa
                    }
                }
            })

            const failedRoleEditOffice = await mutate({
                query : DELETE_OFFICE
            })

            console.log(failedRoleEditOffice, "ini delete office fail author");
            expect(failedRoleEditOffice.errors[0].message).toBe("unauthorize acces")
            done()
        } )
    })

})
