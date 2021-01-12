import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

router.get('/', () =>{
  console.log("connected")
})

router.post('/create', (req, res) => {
  console.log('In /distributor file')
    var sql = `INSERT INTO DISTRIBUTOR(distributor_name,contact_no ,order_id) VALUES ('${req.body['DistributorName']}', '${req.body['DistContactNum']}', '${req.body['PresentOrder']}') `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
      res.json("Success!")
      //res.json({
        //"status_id": 1,
        //"response": "Data inserted successfully"
    });
})

router.post('/update', (req,res) => {
  console.log('In /distributor file')
 
    var sql = `UPDATE DISTRIBUTOR SET distributor_name = '${req.body['NewDistributorName']}',contact_no ='${req.body['NewDistContactNum']}',order_id ='${req.body['NewPresentOrder']}' WHERE distributor_id = '${req.body['DistributorID']}' `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  
})

router.post('/delete', (req,res) => {
  console.log('In /distributor file')
    var sql = `DELETE FROM DISTRIBUTOR WHERE distributor_id = '${req.body['DDistributorId']}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
})
router.get('/read', (req,res) => {
  console.log('In /distributor file')
  con.query("SELECT * FROM DISTRIBUTOR", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
  
});
})
export default router;

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE DISTRIBUTOR (distributor_id INT PRIMARY KEY AUTO_INCREMENT, distributor_name VARCHAR(100),contact_no VARCHAR(10),present_order VARCHAR(6))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO DISTRIBUTOR(distributor_name,contact_no ,present_order) VALUES ('Shweta','9022578963','1') ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/
  
  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO DISTRIBUTOR(distributor_name,contact_no ,present_order) VALUES ('aash','9902299573',2) ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/

  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM DISTRIBUTOR WHERE distributor_name = 2";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM DISTRIBUTOR", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM DISTRIBUTOR WHERE distributor_name = 'Shweta' ", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });*/

  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE DISTRIBUTOR SET distributor_name = 'Cheeta' WHERE distributor_id = 3";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/

  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE DISTRIBUTOR SET contact_no = '26606990' WHERE distributor_id = 3";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE DISTRIBUTOR SET present_order = '2' WHERE distributor_id = 3";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/


  
  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM DISTRIBUTOR WHERE distributor_name = 'Cheeta' ", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });*/



  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "DROP TABLE DISTRIBUTOR ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });
  });*/