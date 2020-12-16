import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

router.use('/', () => {
  console.log('In /distributor file')
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


  

