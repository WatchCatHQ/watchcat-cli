const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const { Command } = require('commander');
const { globSync } = require('glob');
const packageJson = require('./package.json');

const program = new Command();

program
    .name('watchcat-cli')
    .description('CLI tool for watchcat.io')
    .version(packageJson.version);

program
    .option('-u, --url <string>', 'API base url', 'http://api.watchcat.io')

program
    .command('sourcemap')
    .arguments('<app_token> <dir>')
    .description('Uploads sourcemaps from given directory')
    .action(async (app_token, dir) => {
        const url = program.opts().url
        const maps = globSync(`${dir}/**/*.js.map`);

        if (maps.length === 0) {
            console.warn(`No maps in ${dir}`);
            return;
        }

        for (const map of maps) {
            try {
                const form = new FormData();
                form.append('file', fs.readFileSync(map), path.basename(map));

                const response = await axios.post(`${url}/api/sourcemap.in`, form, {
                    headers: {
                        'x-watchcat-app-token': app_token,
                        ...form.getHeaders(),
                    },
                });

                console.log(`${map} uploaded successfully. Status: ${response.status}`);
            } catch (error) {
                console.error(`${map} errored while uploading: ${error.message}`);
                process.exit(1);
            }
        }
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
