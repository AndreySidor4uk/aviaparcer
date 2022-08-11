#!/usr/bin/env node
const { initdb } = require("./prisma");
const { polling } = require("./polling");

require("yargs")
    .scriptName("aviaparcer")
    .usage("$0 <cmd> [args]")
    .command("initdb", "Init default values on db tables", {}, initdb)
    .command(
        "polling",
        "Start polling prices",
        {
            timeout: {
                alias: "t",
                default: 60,
                defaultDescription: "60",
                description: "Set timeout polling",
                type: "number",
            },
        },
        (argv) => {
            console.log(`Start polling...`);
            polling(argv.timeout);
        }
    )
    .help().argv;
