module.exports = (sequelize, dataTypes) => {
    const model = sequelize.define('JobPosting', {
        title: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        description: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        postingDate: {
            type: dataTypes.DATEONLY,
            allowNull: false
        }
    });

    model.associate = (models) => {
        model.belongsTo(models.Location, { as: "location", foreignKey: "locationId" });
        model.belongsToMany(models.JobSeeker, { through: models.JobApplication });
    };

    return model;
};