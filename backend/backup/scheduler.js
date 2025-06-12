require('dotenv').config({path: `${process.cwd()}/.env`});
const cron = require('node-cron');
const { DB_NAME, SEC_DB_NAME } = process.env;
const createDatabaseBackup = require('./backup');
const { deleteUserBackup } = require('../controllers/userController');

        //   min hr d m sem
cron.schedule('* * 1 * *', async () => {
    try {
        await deleteUserBackup();
        
        const now = Date.now();

        await createDatabaseBackup(`${now}backup_api_temp.dump`, `${now}backup_api.dump`, DB_NAME);
    } catch(error) {
        console.error("Erro: ", error);
    }
});

cron.schedule('0 * * * *', async () => {
    try {
        const now = Date.now();

        await createDatabaseBackup(`${now}backup_secondary_temp.dump`, `${now}backup_secondary.dump` , SEC_DB_NAME);
    } catch(error) {
        console.error("Erro: ", error);
    }
});
