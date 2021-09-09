import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()





router.get('/read1', (req,res) => {
  console.log('In /gainorloss file read')
  con.query("SELECT * FROM COST_PRICE", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
})

router.get('/read2', (req,res) => {
  console.log('In /gainorloss file read')
  con.query("SELECT * FROM SELLING_PRICE", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
})

router.get('/read3', (req,res) => {
  console.log('In /gainorloss file read')
  con.query("SELECT * FROM PROFIT_LOSS", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
})

router.get('/read4', (req,res) => {
  console.log('In /gainorloss file read')
  con.query("SELECT * FROM PERCENTAGE", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
})

/*con.connect(function(err) {
 // if (err) throw err;
  var sql = "SELECT * FROM PERCENTAGE ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});*/

export default router;