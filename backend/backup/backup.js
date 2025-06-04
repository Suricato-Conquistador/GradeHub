require('dotenv').config({path: `${process.cwd()}/.env`});
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
// 'backup_api_temp.sql' 'backup_api.sql' 

function createDatabaseBackup(tempFile, finalFile, dbName) {
    const backupTempPath = path.join(__dirname, tempFile);
    const backupFinalPath = path.join(__dirname, finalFile);

    return new Promise((resolve, reject) => {
        const command = `pg_dump -U ${DB_USERNAME} -h ${DB_HOST} -p ${DB_PORT} -F p -f ${backupTempPath} ${dbName}`;
        
        exec(command, {
            env: { ...process.env, PGPASSWORD: DB_PASSWORD }, 
        }, (error, stdout, stderr) => {
            
            if(error) return reject(`Erro ao gerar backup ${error.message}`);
            
            if(stderr) console.warn(`Aviso: ${stderr}`);
        
            if(fs.existsSync(backupTempPath)) {
                const content = fs.readFileSync(backupTempPath, 'utf-8');
        
                if(content.includes('CREATE TABLE') || content.includes('INSERT INTO')) {
                    fs.renameSync(backupTempPath, backupFinalPath);
                    console.log(`Backup criado com sucesso em ${backupFinalPath}`);
                    return resolve();
                } else {
                    return reject('Conteúdo do backup incompleto ou corrompido.');
                }
            } else {
                return reject('Backup temporário não foi criado.');
            }
        });
    });
}   

module.exports = createDatabaseBackup;
