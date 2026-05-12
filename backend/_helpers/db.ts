import config from '../config.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
    try {
        if (process.env.SKIP_DB_INIT === 'true') {
            console.warn('Database initialization skipped (SKIP_DB_INIT=true)');
            return;
        }

        const host = process.env.MYSQL_HOST || config.database.host;
        const port = Number(process.env.MYSQL_PORT) || config.database.port;
        const user = process.env.MYSQL_USER || config.database.user;
        const password = process.env.MYSQL_PASSWORD || config.database.password;
        const database = process.env.MYSQL_DATABASE || config.database.database;

        // Skip manual DB creation on Vercel/Clever Cloud as it is already created
        if (!process.env.VERCEL) {
            const connection = await mysql.createConnection({ host, port, user, password });
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
            await connection.end();
        }

        const sequelize = new Sequelize(database, user, password, { 
            host, 
            port, 
            dialect: 'mysql',
            dialectModule: require('mysql2'),
            logging: false // Disable logging for production
        });

        db.Account = accountModel(sequelize);
        db.RefreshToken = refreshTokenModel(sequelize);
        db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
        db.RefreshToken.belongsTo(db.Account);

        await sequelize.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
}