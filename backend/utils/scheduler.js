const cron = require('node-cron');
const { deleteUserBackup } = require('../controllers/userController');

cron.schedule('0 10 * * 3', async () => {
    try {
        await deleteUserBackup();
    } catch(error) {
        console.error("Erro ao sanitizar", error);
    }
});
