module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts", {
        // issueId: {
        //     auto created by sequelize thanks to foreign key
        // },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Posts;
}