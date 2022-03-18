const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const head = fs.readFileSync(__dirname + '/_head.html', 'utf8');
const footer = fs.readFileSync(__dirname + '/_footer.html', 'utf8');

async function main() {
    const docs = fs.readdirSync(__dirname + '/input/');
    for (const doc of docs) {
        const result = await mammoth.convertToHtml({ path: __dirname + '/input/' + doc });

        const html = result.value; // The generated HTML
        // const messages = result.messages; // Any messages, such as warnings during conversion

        const newContent = head + html + footer;
        fs.writeFileSync(__dirname + '/output/' + path.parse(doc).name + '.html', newContent);
    }
}

main();
