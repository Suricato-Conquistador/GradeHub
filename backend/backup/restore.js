require('dotenv').config({path: `${process.cwd()}/.env`});
const { exec } = require('child_process');
const path = require('path'); 
const { deleteUserBackup } = require('../controllers/userController');

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

function restoreBackup(backupFile, dbname) {
    const backupPath = path.join(__dirname, backupFile);

    return new Promise((resolve, reject) => {
        const command = `pg_restore --clean -U ${DB_USERNAME} -h ${DB_HOST} -p ${DB_PORT} -d ${dbname} "${backupPath}"`;
    
        exec(command, {
            env: { ...process.env, PGPASSWORD: DB_PASSWORD },
        }, async (error, stderr,  stdout) => {
            if(error) return reject(`Erro ao restaurar backup ${error.message}`);

            if(stderr) console.warn(`Aviso: ${stderr}`);

            await deleteUserBackup();

            return resolve();
        });
    }); 
}

//restoreBackup('1749646800547backup_api.dump', 'gradehub').catch(err => console.error(err));
//restoreBackup('1749646800547backup_secondary.dump', 'remove_db').catch(err => console.error