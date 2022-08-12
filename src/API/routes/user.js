const { prisma } = require("../../prisma");

module.exports = async function (api, options) {
    const BASE_URL = "/user";
    const qry = prisma.user;

    async function stringify(data) {
        return await JSON.stringify(data, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );
    }

    api.get(BASE_URL, async (req) => {
        const { name, telegramId } = req.query;
        const filter = {};

        if (name) {
            filter.name = {
                contains: name,
            };
        }
        if (telegramId) {
            filter.telegramId = Number(telegramId);
        }

        const result = await qry.findMany(
            name || telegramId ? { where: filter } : {}
        );

        return await stringify(result);
    });

    api.get(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        const result = await qry.findFirstOrThrow({
            where: {
                id: Number(id),
            },
        });
        return await stringify(result);
    });

    api.post(BASE_URL, async (req) => {
        const { name, telegramId } = req.query;

        const result = await qry.create({
            name,
            telegramId,
        });
        return await stringify(result);
    });

    api.put(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        const result = await qry.update({
            data: req.body,
            where: {
                id: Number(id),
            },
        });
        return await stringify(result);
    });

    api.delete(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        const result = await qry.delete({
            where: {
                id: Number(id),
            },
        });
        return await stringify(result);
    });
};
