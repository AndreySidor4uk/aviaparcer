const { fetch } = require("undici");
const { API_TOKEN } = require("../settings");

async function getCities() {
    const res = await fetch("http://api.travelpayouts.com/data/ru/cities.json");
    return await res.json();
}

async function getPrice(origin, destination, departure_at, return_at, direct) {
    const params = new URLSearchParams();
    params.append("origin", origin);
    if (destination) {
        params.append("destination", destination);
    }
    params.append("departure_at", formatDate(departure_at));
    if (return_at) {
        params.append("return_at", formatDate(return_at));
    }
    params.append("direct", Boolean(direct));
    params.append("sorting", "price");

    const resp = await fetch(
        `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${params.toString()}`,
        {
            headers: {
                "X-Access-Token": API_TOKEN,
            },
        }
    );
    const json = await resp.json();

    return json.data[0].price;
}

function formatDate(date) {
    return date.toJSON().split("T")[0];
}

module.exports = { getCities, getPrice };
