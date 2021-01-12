import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

router.use('/', () => {
  console.log('In /distributor file')
})

//to display the products in the order in the expanded row
router.post('/read1', (req,res) => {
  console.log('In /joined file read')
  var sql=`SELECT DISTINCT product_name,prod_quantity,amt FROM mydb.ORDER,PLACED_FOR,PRODUCT WHERE ord_id='${req.body['OrderID']}' AND pro_id=product_id `;
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
})

//to update the product quantity in the order based on order_id and product_id
router.post('/update1', (req,res) => {
  console.log('In /joined file update order')
  
  var sql = `SELECT product_id FROM PRODUCT WHERE product_name='${req.body['NewProductName']}' `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(req.body)
    console.log(result[0].product_id)
    var sql = `UPDATE PLACED_FOR SET prod_quantity='${req.body['NewProductQty']}' WHERE ord_id = '${req.body['OrderID']}' AND pro_id = '${result[0].product_id}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.json(result)
    });
  });
})

//to insert each product of the order into the placed_for table
router.post('/create1', (req,res) => {
  console.log('In /joined file insert')
  var sql = `SELECT product_id FROM PRODUCT WHERE product_name='${req.body['ProductName']}' `;
  con.query(sql, function (err, result) {
    if (err) throw err;
  var sql=`INSERT INTO PLACED_FOR (ord_id ,pro_id ,prod_quantity ,status ,amt) VALUES ('${req.body['OrderID']}','${result[0].product_id}','${req.body['ProductQty']}','ongoing',240)`;
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
  });
})

//to delete a particular product in an order
router.post('/delete', (req,res) => {
  console.log('In /joined delete file')
    var sql = `DELETE FROM PLACED_FOR WHERE ord_id = '${req.body['DOrderID']}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
})

export default router;

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO to_make(mat_id,prod_id,mat_count) VALUES (1,1,34) ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/


  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO to_make(mat_id,prod_id,mat_count) VALUES (1,3,34) ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/

 /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO placed_for (ord_id ,pro_id ,prod_quantity ,status ,amt) VALUES (3,3,23,'completed',1200)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED FOR PLACED FOR");
    });
  });*/
  
  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO placed_for(ord_id ,pro_id,prod_quantity,status,amt) VALUES (3,1,20,'completed',1000)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
  });*/
  
  
  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO make (emply_id,prods_id,prod_count) VALUES (1,1,100)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("inserted");
    });
  });*/
  
  
  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO make (emply_id,prods_id,prod_count) VALUES (1,3,200)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("inserted");
    });
  });*/


  

