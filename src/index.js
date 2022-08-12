#!/usr/bin/env node

require("yargs")
    .scriptName("aviaparcer")
    .usage("$0 <cmd> [args]")
    .command("initdb", "Init default values on db tables", {}, () => {
        const { initdb } = require("./prisma");
        initdb();
    })
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
            const { polling } = require("./polling");
            console.log(`Start polling...`);
            polling(argv.timeout);
        }
    )
    .command(
        "api",
        "Start API server",
        {
            port: {
                alias: "p",
                default: 3000,
                defaultDescription: "3000",
                description: "Set API server port",
                type: "number",
            },
        },
        (argv) => {
            const api = require("./API");
            api.listen(argv.port, (err, address) => {
                if (err) {
                    api.log.error(err);
                    process.exit(1);
                }
                console.log(`🚀 Server ready at: ${address}`);
            });
        }
    )
    .help().argv;
