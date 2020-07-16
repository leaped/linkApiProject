const restify = require('restify');
const routes = require('./View/routes')
require('dotenv').config()


const server = restify.createServer({
  name: process.env.webservice_NAME,
  version: '1.0.0'
});
 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 
// server.post('/echo', function (req, res, next) {
//   res.send(req.body.name)
//   console.log(req.body)
// });
routes.routes(server)


server.listen(process.env.webservice_PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});


