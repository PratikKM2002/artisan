import mysql from 'mysql';

export let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Money_heist1",
  database:"mydb"
  
});
con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


/*con.end(function(err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});*/