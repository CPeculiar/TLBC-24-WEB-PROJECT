import 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true
  }
});

async function clearData() {
  try {
    await client.connect();
    console.log('Connected to the database');

    // await client.query('TRUNCATE TABLE payments_transaction RESTART IDENTITY CASCADE');
    // await client.query('TRUNCATE TABLE register_participant RESTART IDENTITY CASCADE');
    // await client.query('TRUNCATE TABLE register_partner RESTART IDENTITY CASCADE');

    const tables = [
      'payments_transaction',
      'register_participant',
      'register_partner'
    ];

    for (const table of tables) {
      await client.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`);
      console.log(`Table ${table} truncated.`);
    }

    console.log('Data cleared successfully');
    await client.end();  
    console.log('Disconnected from the database');
  } catch (err) {
    console.error('Error clearing data:', err);
  }
}

clearData();


//run in the terminal  node clearData.js