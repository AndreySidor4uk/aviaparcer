const Fastify = require("fastify");

const api = Fastify({ logger: false });

api.register(require("./routes/city"));
api.register(require("./routes/user"));

module.exports = api;
