const { prisma } = require("../../prisma");

module.exports = async function (api, options) {
    const BASE_URL = "/tracks";
    const qry = prisma.track;

    api.get(BASE_URL, async (req) => {
        const {
            userId,
            originId,
            destinationId,
            departureAt,
            returnAt,
            direct,
            notify,
            enabled,
        } = req.query;

        const filter = {};
        if (userId) filter.userId = Number(userId);
        if (originId) filter.originId = originId.toUpperCase();
        if (destinationId) filter.destinationId = destinationId.toUpperCase();
        if (departureAt) filter.departureAt = new Date(departureAt);
        if (returnAt) filter.returnAt = new Date(returnAt);
        if (direct) filter.direct = JSON.parse(direct);
        if (notify) filter.notify = JSON.parse(notify);
        if (enabled) filter.enabled = JSON.parse(enabled);

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
