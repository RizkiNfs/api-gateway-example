const fastify = require('fastify')({})

fastify.get('/', function (request, reply) {
  reply.send({ message: 'hello from service 1 ' })
})

fastify.listen(4001, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`service1 listening on ${address}`)
})