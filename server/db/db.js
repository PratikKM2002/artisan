import mysql from 'mysql';

export let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Money_heist1",
  database:"mydb"
  
});
