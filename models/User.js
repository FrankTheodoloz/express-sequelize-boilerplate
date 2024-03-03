import {DataTypes} from "sequelize";

export const UserModel = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
        }, first_name: {
            type: DataTypes.STRING, allowNull: true,
        }, last_name: {
            type: DataTypes.STRING, allowNull: true,
        }, bio: {
            type: DataTypes.TEXT, allowNull: true,
        }, email: {
            type: DataTypes.STRING, allowNull: false,
        }, password: {
            type: DataTypes.STRING, allowNull: false,
        }, is_verified: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false,
        }, token: {
            type: DataTypes.STRING, allowNull: true,
        },
    }, {
        // Other model options go here
        freezeTableName: true, //tableName: 'tablename',
        timestamps: true,
    });
};
