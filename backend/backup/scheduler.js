const cron = require('node-cron');
const { createDatabaseBackup } = require('./backup');
const { deleteUserBackup } = require('../controllers/userController');

        //   min hr d m sem
cron.schedule('* * * * *', async () => {
    try {
        await deleteUserBackup();
        
        await createDatabaseBackup();
    } catch(error) {
        console.error("Erro: ", error);
    }
});

cron.schedule('0 * * * *', async () => {
    try {
        console.log("backup banco secundário");
    } catch(error) {
        console.error("Erro: ", error);
    }
});
