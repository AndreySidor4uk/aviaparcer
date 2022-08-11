const { fetch } = require("undici");
const { TELEGRAM_BOT_TOKEN } = require("../settings");

const BASE_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function sendMessage(chatId, message) {
    const params = new URLSearchParams();
    params.append("chat_id", chatId);
    params.append("text", message);

    const resp = await fetch(`${BASE_URL}/sendMessage?${params.toString()}`);
    return resp.ok;
}

module.exports = { sendMessage };
