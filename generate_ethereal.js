const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account: ' + err.message);
        process.exit(1);
    }
    console.log('Credentials obtained:');
    console.log('User:', account.user);
    console.log('Pass:', account.pass);
    
    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        config.smtpOptions = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: account.user,
                pass: account.pass
            }
        };
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log('config.json updated successfully!');
    } catch (e) {
        console.error('Failed to update config.json:', e.message);
        process.exit(1);
    }
});
