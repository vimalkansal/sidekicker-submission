module.exports = (sequelize, dataTypes) => {
    const model = sequelize.define('JobSeeker', {
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    model.associate = (models) => {
        model.belongsToMany(models.JobPosting, { through: models.JobApplication });
    };

    return model;
};