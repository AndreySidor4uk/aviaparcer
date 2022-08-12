const Fastify = require("fastify");

const api = Fastify({ logger: false });

api.register(require("./routes/city"));

module.exports = api;
