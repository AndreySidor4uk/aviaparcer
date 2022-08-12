const { prisma } = require("../../prisma");

module.exports = async function (api, options) {
    const BASE_URL = "/city";
    const qry = prisma.city;

    api.get(BASE_URL, async (req) => {
        const { name, timeZone, countryCode } = req.query;
        const filter = {};

        if (name) {
            filter.name = {
                contains: name,
            };
        }
        if (timeZone) {
            filter.timeZone = {
                contains: timeZone,
            };
        }
        if (countryCode) {
            filter.countryCode = countryCode.toUpperCase();
        }

        return await qry.findMany(
            name || timeZone || countryCode ? { where: filter } : {}
        );
    });

    api.get(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        return await qry.findFirstOrThrow({
            where: {
                id: id.toUpperCase(),
            },
        });
    });

    api.post(BASE_URL, async (req) => {
        const { name, timeZone, countryCode } = req.body;

        return await qry.create({
            name,
            timeZone,
            countryCode,
        });
    });

    api.put(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        return await qry.update({
            data: req.body,
            where: {
                id,
            },
        });
    });

    api.delete(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        return await qry.delete({
            where: {
                id,
            },
        });
    });
};
