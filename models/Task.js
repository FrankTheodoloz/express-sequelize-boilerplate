import {DataTypes} from "sequelize";

export const TaskModel = (sequelize) => {
    return sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
        }, task: {
            type: DataTypes.STRING, allowNull: false,
        }, picture: {
            type: DataTypes.STRING, allowNull: true,
        }, status: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false,
        },
    }, {
        //see https://sequelize.org/docs/v6/core-concepts/model-basics/#table-name-inference
        freezeTableName: true, // use model name
        // tableName: 'Tasks'
        timestamps: true,
    });
};
