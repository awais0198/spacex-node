require('dotenv').config();

const db = require('./src/models');
const { app } = require('./src/app');

const bootstrap = async () => {
	const PORT = process.env.PORT || 8000;
	await db.sequelize.sync();
	app.listen(PORT);
};

bootstrap();

module.exports = app;
