process.env.DATABASE_URL="postgresql://postgres:gED5%24!ajmg.J8W%25@db.xrqffjfjsyudtkulslno.supabase.co:5432/postgres?sslmode=require";
try {
  const sequelize = require('./src/config/database');

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.message);
        console.error('Full trace:', err);
        process.exit(1);
    });
} catch(e) {
  require('fs').writeFileSync('err.txt', e.stack);
}
