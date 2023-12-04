
import pkg from 'pg';
const { Client } = pkg;

async function PostgreSQLgClient() {

const connectionOptions = {
    user: 'postgres',
    host: 'localhost',
    database: 'roomies',
    password: '@Abhisid2811',
    port: '5432', 
  };
  
  const client = new Client(connectionOptions);
  
  client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));
  
  return client;

}

export default PostgreSQLgClient;

