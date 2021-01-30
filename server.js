const http = require('http')
const server = require('./app')
const port = process.env.PORT || 3000

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});