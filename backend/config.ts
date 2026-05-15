let config: any;

try {
    // Try to load local config.json if it exists
    config = require('./config.json');
} catch (e) {
    // If config.json doesn't exist (like on Vercel), use empty object
    config = {
        database: {},
        smtpOptions: { auth: {} }
    };
}

const finalConfig = {
    // Database
    dbHost: process.env.DB_HOST || process.env.MYSQL_HOST || config.database.host,
    dbPort: Number(process.env.DB_PORT) || Number(process.env.MYSQL_PORT) || config.database.port || 3306,
    dbUser: process.env.DB_USER || process.env.MYSQL_USER || config.database.user,
    dbPass: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || config.database.password,
    dbName: process.env.DB_NAME || process.env.MYSQL_DATABASE || config.database.database,
    
    // Auth & Email
    secret: process.env.JWT_SECRET || config.secret,
    emailFrom: process.env.EMAIL_FROM || config.emailFrom,
    
    // SMTP
    smtpHost: process.env.SMTP_HOST || config.smtpOptions.host,
    smtpPort: Number(process.env.SMTP_PORT) || config.smtpOptions.port,
    smtpUser: process.env.SMTP_USER || config.smtpOptions.auth?.user,
    smtpPass: process.env.SMTP_PASS || config.smtpOptions.auth?.pass,
};

export default finalConfig;
