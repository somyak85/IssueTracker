module.exports = (sequelize, DataTypes) => {
    const NewAuth = sequelize.define("newAuth", {
        issueId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return NewAuth;
}