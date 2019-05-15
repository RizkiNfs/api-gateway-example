const fastify = require('fastify')({})

// required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))
fastify.register(require('fastify-jwt'), {
  secret: 'supersecret'
})
// gateway plugin
fastify.register(require('k-fastify-gateway'), {
  middlewares: [
    require('cors')()
  ],
  pathRegex: '',
  routes: [
    {
      prefix: '/service1',
      prefixRewrite: '',
      target: 'http://localhost:4001',
      middlewares: [],
      hooks: {
        onRequest: async (request, reply) => {
          try {
            await request.jwtVerify()
          } catch (err) {
            reply.send(err)
          }
        },
      }
    },
    {
      prefix: '/service2',
      prefixRewrite: '',
      target: 'http://localhost:4002',
      middlewares: [],
      hooks: {}
    },
    {
      prefix: '/google',
      prefixRewrite: '',
      target: 'https://google.com',
      middlewares: [],
      hooks: {}
    },
  ]
})

fastify.get('/', function (request, reply) {
  reply.send({ message: 'hello from api-gateway' })
})

fastify.get('/token', function (request, reply) {
  const token = fastify.jwt.sign({ 'user': 'user123' })
  reply.send({ token })
})

// start the gateway HTTP server
// Run the server!
fastify.listen(4000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`api gateway listening on ${address}`)
})