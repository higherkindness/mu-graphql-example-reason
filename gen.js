const fs = require('fs');
const schema = fs.readFileSync('./schema.gql', "utf8");
const convert = require('graphql-to-json-converter');

const jsonSchema = convert(schema);

fs.writeFile('./graphql_schema.json',
    JSON.stringify(jsonSchema, null, 2) + '\n',
    'utf8',
    function (err) {
        if (err) console.log(err);
    });