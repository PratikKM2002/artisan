import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

/*router.use('/', () => {
  console.log('In /joined file')
})*/


//to display the products in the order in the expanded row
router.post('/read1', (req,res) => {
  console.log('In /joined file read')
  var sql=`SELECT DISTINCT product_name,prod_quantity,amt FROM mydb.ORDERS,placed_for,PRODUCT WHERE ord_id='${req.body['OrderID']}' AND pro_id=product_id `;
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
    var sql = `UPDATE placed_for SET prod_quantity='${req.body['NewProductQty']}' WHERE ord_id = '${req.body['OrderID']}' AND pro_id = '${result[0].product_id}'`;
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
  var sql=`INSERT INTO placed_for (ord_id ,pro_id ,prod_quantity ,status ,amt) VALUES ('${req.body['OrderID']}','${result[0].product_id}','${req.body['ProductQty']}','ongoing',240)`;
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
  });
})

//to delete a particular product in an order
router.post('/delete', (req,res) => {
  console.log('In /joined delete file')
    var sql = `DELETE FROM placed_for WHERE ord_id = '${req.body['DOrderID']}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
})
//to display the materials in the order in the expanded row
router.post('/read2', (req,res) => {
  console.log('In /joined file read')
  var sql=`SELECT DISTINCT material_name,mat_count FROM PRODUCT,to_make,RAW_MATERIALS WHERE prod_id='${req.body['ProductID']}' AND mat_id=material_id `;
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
})

//to update the material count for the product based on product_id and material_id
router.post('/update2', (req,res) => {
  console.log('In /joined file update order')
  
  var sql = `SELECT material_id FROM RAW_MATERIALS WHERE material_name='${req.body['NewMaterialName']}' `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(req.body)
    console.log(result[0].material_id)
    var sql = `UPDATE to_make SET mat_count='${req.body['NewMaterialCount']}' WHERE prod_id = '${req.body['ProductID']}' AND mat_id = '${result[0].material_id}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.json(result)
    });
  });
})

//to insert each material required for the product into the to_make table
router.post('/create2', (req,res) => {
  console.log('In /joined file insert')
  var sql = `SELECT material_id FROM RAW_MATERIALS WHERE material_name='${req.body['MaterialName']}' `;
  con.query(sql, function (err, result) {
    if (err) throw err;
  var sql=`INSERT INTO to_make (mat_id ,prod_id ,mat_count) VALUES ('${result[0].material_id}','${req.body['ProductID']}','${req.body['MaterialCount']}')`;
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
  });
})

//to delete a particular product in an order
router.post('/delete2', (req,res) => {
  console.log('In /joined delete file')
    var sql = `DELETE FROM to_make WHERE prod_id = '${req.body['DProductID']}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
})

//to display the products made by the employee in the expanded row
router.post('/read3', (req,res) => {
  console.log('In /joined file read')
  var sql=`SELECT DISTINCT product_name,prod_count FROM PRODUCT,make,EMPLOYEE WHERE emply_id='${req.body['EmployeeID']}' AND prods_id=product_id `;
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
})

//to update the material count for the product based on product_id and material_id
router.post('/update3', (req,res) => {
  console.log('In /joined file update order')
   
  var sql = `SELECT product_id FROM PRODUCT WHERE product_name='${req.body['NewProductName']}' `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(req.body)
    var sql = `UPDATE make SET prod_count='${req.body['NewProductCount']}' WHERE emply_id = '${req.body['EmployeeID']}' AND prods_id = '${result[0].product_id}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.json(result)
    });
  });
})

//to insert each material required for the product into the to_make table
router.post('/create3', (req,res) => {
  console.log('In /joined file insert')
  var sql = `SELECT product_id FROM PRODUCT WHERE product_name='${req.body['ProductName']}' `;
  con.query(sql, function (err, result) {
    if (err) throw err;
  var sql=`INSERT INTO make (prods_id,emply_id,prod_count) VALUES ('${result[0].product_id}','${req.body['EmployeeID']}','${req.body['ProductCount']}')`;
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
  });
})

//to delete a particular product in an order
router.post('/delete3', (req,res) => {
  console.log('In /joined delete file')
    var sql = `DELETE FROM make WHERE emply_id = '${req.body['DEmpID']}'`;
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


  

