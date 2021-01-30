const http = require('http')
const app = require('./app')
const PORT = process.env.PORT  || 3000

app.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
