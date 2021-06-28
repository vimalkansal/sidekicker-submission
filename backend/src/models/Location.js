module.exports = (sequelize, dataTypes) => {
    const model = sequelize.define('Location', {
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    });

    model.associate = (models) => {
        model.hasMany(models.JobPosting, { foreignKey: "locationId" });
    };

    return model;
};