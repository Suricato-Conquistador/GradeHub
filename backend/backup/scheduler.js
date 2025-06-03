const cron = require('node-cron');
const { createDatabaseBackup, createSecondaryDatabaseBackup } = require('./backup');
const { deleteUserBackup } = require('../controllers/userController');

        //   min hr d m sem
cron.schedule('* * 1 * *', async () => {
    try {
        await deleteUserBackup();
        
        await createDatabaseBackup();
    } catch(error) {
        console.error("Erro: ", error);
    }
});

cron.schedule('0 * * * *', async () => {
    try {
        await createSecondaryDatabaseBackup();
    } catch(error) {
        console.error("Erro: ", error);
    }
});
