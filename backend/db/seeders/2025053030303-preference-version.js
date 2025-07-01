module.exports = {
    up: (queryInterface, Sequelize) => {
        const preferencesVersion = [
        {
            version: "1.0",
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            
        },
        
        ];
    
        return queryInterface.bulkInsert('preferencesVersion', preferencesVersion);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('preferencesVersion', null, {});
    }
    }; 