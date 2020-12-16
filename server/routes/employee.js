import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

router.use('/', () => {
  console.log('In /order file')
})

export default router;

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE EMPLOYEE (emp_id INT AUTO_INCREMENT PRIMARY KEY, emp_name VARCHAR(100),phone_no VARCHAR(10),street_no INT, street_name VARCHAR(100), house_no INT,salary INT)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });*/

  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO EMPLOYEE(emp_name,phone_no ,street_no, street_name, house_no,salary) VALUES ('XYZ','7562542267', 3,'AbC',110,500) ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/
  
  

  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO EMPLOYEE(emp_name,phone_no ,street_no, street_name, house_no,salary) VALUES ('UVW','7562782267', 1,'ABC',120,550) ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM EMPLOYEE", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });*/



  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM EMPLOYEE WHERE emp_name = 'UVW' ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE EMPLOYEE SET emp_name = 'Quishi' WHERE emp_id = 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/

  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE EMPLOYEE SET phone_no = '7022710979' WHERE emp_id = 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/

  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE EMPLOYEE SET street_no = '14' WHERE emp_id = 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE EMPLOYEE SET street_name = 'Sty' WHERE emp_id = 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/

  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE EMPLOYEE SET house_no = '441' WHERE emp_id = 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/

  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE EMPLOYEE SET salary = '10000' WHERE emp_id = 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM EMPLOYEE WHERE emp_name= 'Quishi' ", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT product_name AS ProductName ,prod_count AS QuantityMade FROM make JOIN EMPLOYEE ON EMPLOYEE.emp_id = make.emply_id JOIN PRODUCT ON make.prods_id = PRODUCT.product_id ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }); */