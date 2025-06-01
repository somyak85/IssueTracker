module.exports = (sequelize, DataTypes) => {
    const Issues = sequelize.define("issues", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Pending'
        },
        // userId: {
        // auto defined by sequelize thanks to foreign key
        // }
    });
    return Issues;
}