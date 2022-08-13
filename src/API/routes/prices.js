const { prisma } = require("../../prisma");

module.exports = async function (api, options) {
    const BASE_URL = "/prices";
    const qry = prisma.price;

    api.get(BASE_URL, async (req) => {
        const { datePrice, trackId } = req.query;

        const filter = {};
        if (datePrice) {
            const dateStart = new Date(datePrice);
            dateStart.setHours(0, 0, 0, 0);

            const dateEnd = new Date(datePrice);
            dateEnd.setHours(23, 59, 59, 999);

            filter.AND = [
                {
                    datePrice: {
                        gte: dateStart,
                    },
                },
                {
                    datePrice: {
                        lte: dateEnd,
                    },
                },
            ];
        }
        if (trackId) filter.trackId = Number(trackId);

        return await qry.findMany({ where: filter });
    });

    api.get(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        return await qry.findFirstOrThrow({
            where: {
                id: Number(id),
            },
        });
    });

    api.post(BASE_URL, async (req) => {
        return await qry.create({
            data: req.body,
        });
    });

    api.put(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        return await qry.update({
            data: req.body,
            where: {
                id: Number(id),
            },
        });
    });

    api.delete(`${BASE_URL}/:id`, async (req) => {
        const { id } = req.params;
        return await qry.delete({
            where: {
                id: Number(id),
            },
        });
    });
};
