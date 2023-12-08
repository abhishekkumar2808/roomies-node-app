
import pkg from 'pg';
const { Client } = pkg;

async function PostgreSQLgClient() {

const connectionOptions = {
    user: 'dvqpuvrl',
    host: 'berry.db.elephantsql.com',
    database: 'dvqpuvrl',
    password: 'ZphSx5SSFtcZEu8EOVIoda__R_M_qUDl',
    port: '5432', 
  };
  
  const client = new Client(connectionOptions);
  
  client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));
  
  return client;

}

export default PostgreSQLgClient;

