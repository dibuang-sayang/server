const http = require('http')
const server = require('./app')
const PORT = process.env.PORT || 3000

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});