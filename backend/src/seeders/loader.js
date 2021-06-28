const fs = require('fs');
const csv = require('csv-parser');
const db = require('../models');

(async () => {
    await db.sequelize.sync({ force: true });

    fs.createReadStream(__dirname + '/jobs-list.csv')
        .pipe(csv())
        .on('data', function (data) {
            records.push(data);
        })
        .on('end', () => {


            records.map((record) => {

            });
        });
})();