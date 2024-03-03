import {Sequelize} from "sequelize";

import {TaskModel} from "./models/Task";
import {UserModel} from "./models/User";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost', dialect: 'mysql' /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('💾 Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Create Models
const Task = TaskModel(sequelize);
const User = UserModel(sequelize);

if (process.env.MIGRATE_DB === 'TRUE') {
    sequelize.sync().then(() => {
        console.log(`All tables synced!`);
        process.exit(0);
    });
}

module.exports = {
    Task, User,
};
