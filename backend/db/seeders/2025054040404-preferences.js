module.exports = {
    up: (queryInterface, Sequelize) => {
        const preferences = [
            {
                name: "Termos de Privacidade",
                description: "Declaro que li e concordo com a Política de Privacidade, autorizando o tratamento dos meus dados pessoais conforme descrito, para as finalidades necessárias à utilização deste serviço, em conformidade com a LGPD.",
                versionId: 1, // Assuming this is the ID of the first version in preferencesVersion
                optional: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Termos de Uso",
                description: "Declaro que li e aceito os Termos de Uso, estando ciente das regras, condições e responsabilidades para utilização da plataforma.",
                versionId: 1, // Assuming this is the ID of the first version in preferencesVersion
                optional: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Marketing",
                description: "Autorizo o recebimento de comunicações de marketing, incluindo ofertas, novidades e promoções, pelos meios informados (e-mail, SMS, telefone, entre outros). Estou ciente de que posso revogar este consentimento a qualquer momento.",
                versionId: 1, // Assuming this is the ID of the first version in preferencesVersion
                optional: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        return queryInterface.bulkInsert('preferences', preferences);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('preferences', null, {});
    }}