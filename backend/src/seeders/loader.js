const db = require('../models');

(async () => {
    await db.sequelize.sync({ force: true });
})();