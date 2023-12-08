import express from 'express'
import DataRoutes from './data/routes.js';
import PostgreSQLgClient from './postgres_client.js';
import "dotenv/config";
import cors from "cors";
import session from "express-session";


const app = express();

app.use(cors(
  {
     credentials: true,
     origin: process.env.FRONTEND_URL,
  }  
 ));
 
 const sessionOptions = {
   secret: "any string",
   resave: false,
   saveUninitialized: false,
 };
 
 if (process.env.NODE_ENV !== "development") {
   sessionOptions.proxy = true;
   sessionOptions.cookie = {
     sameSite: "none",
     secure: true,
   };
 }
 app.use(session(sessionOptions));

app.use(express.json())

const client = await PostgreSQLgClient();

DataRoutes(app, client);

process.on('SIGINT', () => {
  client.end().then(() => process.exit(0));
});

app.listen(4000);