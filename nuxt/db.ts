import pg from 'pg';

const { Client } = pg

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
})

client.connect().catch(err => console.error('Failed to connect to the database:', err))

export default client
