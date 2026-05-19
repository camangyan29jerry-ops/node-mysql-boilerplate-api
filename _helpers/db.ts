import config from '../config.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;
  let sequelize;

  try {
    // Attempt connecting to MySQL server
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    // Initialize Sequelize with MySQL
    sequelize = new Sequelize(database, user, password, { dialect: 'mysql', logging: false });
    console.log(`Connected to MySQL database: ${database}`);
  } catch (err: any) {
    console.warn(`MySQL connection failed (${err.message}). Falling back to SQLite in-memory database.`);
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
  }

  // Init models
  db.Account = accountModel(sequelize);
  db.RefreshToken = refreshTokenModel(sequelize);

  // Define relationships
  db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  db.RefreshToken.belongsTo(db.Account);

  db.sequelize = sequelize;

  // Sync models with database
  await sequelize.sync();
  console.log('Database schema synchronized.');
}
