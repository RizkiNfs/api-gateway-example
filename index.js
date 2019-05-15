const fastify = require('fastify')({})

// required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))

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
      hooks: {}
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

// start the gateway HTTP server
// Run the server!
fastify.listen(4000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`api gateway listening on ${address}`)
})