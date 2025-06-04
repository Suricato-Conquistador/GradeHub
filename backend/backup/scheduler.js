require('dotenv').config({path: `${process.cwd()}/.env`});
const cron = require('node-cron');
const { DB_NAME, SEC_DB_NAME } = process.env;
const createDatabaseBackup = require('./backup');
const { deleteUserBackup } = require('../controllers/userController');

        //   min hr d m sem
cron.schedule('* * 1 * *', async () => {
    try {
        await deleteUserBackup();
        
        await createDatabaseBackup('backup_api_temp.sql', 'backup_api.sql', DB_NAME);
    } catch(error) {
        console.error("Erro: ", error);
    }
});

cron.schedule('0 * * * *', async () => {
    try {
        await createDatabaseBackup('backup_secondary_temp.sql', 'backup_secondary.sql' , SEC_DB_NAME);
    } catch(error) {
        console.error("Erro: ", error);
    }
});
