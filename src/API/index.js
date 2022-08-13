const Fastify = require("fastify");

const api = Fastify({ logger: false });

api.register(require("./routes/sities"));
api.register(require("./routes/users"));
api.register(require("./routes/tracks"));

module.exports = api;
