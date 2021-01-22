// const { User } = require("./models");

// async function createUser() {
//   try {
//     const newUser = await User.create({
//       firstName: "tio",
//       lastName: "rizky",
//       password: "qwerty",
//       email: "tio@mail.com",
//       role: "orangbiasa",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// createUser();

// login > hit login > balikin token > localStorage > redirect ke halaman utama > halaman useeffect  >  hit cektoken > role > pengepul/pengarjin

const { encode, decode } = require("./helpers/passHelper");

console.log(encode("test"));
console.log(
  decode("test", "$2a$08$rM3b35l8kRdk/4Dpl7/eYuZbJZUlRS1d4xAaSjUsyEkMJKYvPCPrq")
);
