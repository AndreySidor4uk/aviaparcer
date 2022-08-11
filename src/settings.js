require("dotenv").config();

const API_TOKEN = process.env.API_TOKEN || "";
const DATABASE_URL = process.env.DATABASE_URL || "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";

module.exports = { API_TOKEN, DATABASE_URL, TELEGRAM_BOT_TOKEN };
