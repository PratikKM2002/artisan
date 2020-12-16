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
    var sql = "INSERT INTO ORDERS(order_status,total_amt,dist_id,date_placed,date_delivered) VALUES ('ongoing',10000,1,'2017-08-20',NULL) ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/



  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO ORDERS(order_status,total_amt,dist_id,date_placed,date_delivered) VALUES ('cancelled',20000,1,'2017-09-20',NULL) ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/

  


  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO ORDERS(order_status,total_amt,dist_id,date_placed,date_delivered) VALUES ('completed',25000,1,CURDATE(),NULL) ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM ORDERS WHERE order_status = 'cancelled' and order_id =3 ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM ORDERS", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM ORDERS", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE ORDERS SET order_status = 'vvv' WHERE order_id = 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });

    var sql = "UPDATE ORDERS SET total_amt =25000 WHERE order_id= 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });

    var sql = "UPDATE ORDERS SET date_delivered = CURDATE() WHERE order_id= 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
});*/



/*con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM ORDERS WHERE order_status = 'completed'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/


/*con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT distributor_name AS DistributorName ,ORDERS .* FROM ORDERS JOIN DISTRIBUTOR ON ORDERS.order_id = DISTRIBUTOR.present_order";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});*/