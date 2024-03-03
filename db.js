import {Sequelize} from "sequelize";

import {TaskModel} from "./models/Task.js";
import {UserModel} from "./models/User.js";

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

// instantiate models
export const Task = TaskModel(sequelize);
export const User = UserModel(sequelize);

// sync models
// @see https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
if (process.env.MIGRATE_DB === 'TRUE') {
    sequelize.sync().then(() => {
        console.log(`All tables synced!`);
        process.exit(0);
    });
}
