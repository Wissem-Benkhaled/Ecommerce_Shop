import { data } from "./constant";
const { Pool } = require("pg"); 

// Connexion PostgreSQL
export const pool = new Pool({
  host: data.PGHOST,
  user: data.PGUSER,
  password: data.PGPASSWORD,
  database: data.PGDATABASE,
  port: Number(data.PGPORT),
});