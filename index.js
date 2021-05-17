const restify = require('restify');
const errs = require('restify-errors');
var cors = require('cors')

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

var knex = require('knex')({
    client: 'mysql',
    /*
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'rest_bd'
    }
*/

    connection: {
        host : 'us-cdbr-east-03.cleardb.com',
        user : 'bd86cfe372ddb3',
        port: 3306,
        password : '5db3f4e1',
        database : 'heroku_1d491feb2724f13'
      }
  });

  app.use(cors())

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen((process.env.PORT || 5000), function () {
  console.log('%s listening at %s', server.name, server.url);
});

console.log('ola');
// rotas REST
//teste
server.get('/', (req, res, next) => {
    
    knex('rest').then((dados) => {
        res.send(dados);
    }, next)
    
});

server.post('/create', (req, res, next) => {
    
    knex('rest')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
    
});

server.get('/show/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('rest')
        .where('id', id)
        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next)
        
});

server.put('/update/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('rest')
        .where('id', id)
        .update(req.body)
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados atualizados');
        }, next)
        
});

server.del('/delete/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('rest')
        .where('id', id)
        .delete()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados excluidos');
        }, next)
        
});