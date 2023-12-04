import express from 'express'
import DataRoutes from './data/routes.js';
import PostgreSQLgClient from './postgres_client.js';



const app = express();
app.use(express.json())

const client = await PostgreSQLgClient();

DataRoutes(app, client);

process.on('SIGINT', () => {
  client.end().then(() => process.exit(0));
});

app.listen(4000);