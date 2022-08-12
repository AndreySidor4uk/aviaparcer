const { prisma } = require("./prisma");
const { getPrice } = require("./services/aviasales");
const { sendMessage } = require("./services/telegram");

async function polling(timeout) {
    await prisma.$connect();
    const tracks = await prisma.track.findMany({
        include: {
            user: true,
            origin: true,
            destination: true,
        },
        where: {
            enabled: true,
        },
    });

    for (const track of tracks) {
        const lastPrice = await getLastTrackPrice(track);
        const newPrice = await getPrice(
            track.originId,
            track.destinationId,
            track.departureAt,
            track.returnAt,
            track.direct
        );
        if (lastPrice !== newPrice && newPrice !== 0) {
            await prisma.price.create({
                data: {
                    trackId: track.id,
                    price: newPrice,
                },
            });
            if (
                track.notify &&
                (track.priceNotify >= newPrice || track.priceNotify === 0)
            ) {
                await notifyNewPrice(track, newPrice);
            }
        }
    }

    setTimeout(polling, timeout * 1000, timeout);
}

async function getLastTrackPrice(track) {
    const price = await prisma.price.findFirst({
        where: {
            trackId: track.id,
        },
        orderBy: {
            datePrice: "desc",
        },
    });

    if (!price) {
        return 0;
    }
    return price.price;
}

async function notifyNewPrice(track, price) {
    const message = "".concat(
        `${track.origin.name} - ${track.destination.name}. `,
        `Новая цена: ${price} руб. Период: `,
        dateToString(track.departureAt),
        " - ",
        dateToString(track.returnAt)
    );
    return await sendMessage(track.user.telegramId, message);
}

function dateToString(date) {
    return "".concat(
        date.getDate().toString().padStart(2, "0"),
        ".",
        (date.getMonth() + 1).toString().padStart(2, "0"),
        ".",
        date.getFullYear().toString()
    );
}

module.exports = { polling };
