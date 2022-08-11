const { PrismaClient } = require("@prisma/client");
const { getCities } = require("./services/aviasales");

const prisma = new PrismaClient();

async function initdb() {
    const cities = await getCities();
    for (const city of cities) {
        if (!city.name) {
            continue;
        }
        const result = await prisma.city.create({
            data: {
                id: city.code,
                name: city.name,
                timeZone: city.time_zone,
                countryCode: city.country_code,
            },
        });
        console.log(result);
    }
}

module.exports = { initdb, prisma };
