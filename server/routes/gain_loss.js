import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

router.use('/', () => {
  console.log('In /GainLoss file')
})

export default router;

/*con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT MAT_AMT.MAT_PR AS MaterialCost,EMP_AMT.EMP_SAL AS TotalEmployeeSalary,SUM(total_amt) AS SellingPrice, MAT_AMT.MAT_PR+EMP_AMT.EMP_SAL AS CostPrice, (SUM(total_amt)-(MAT_AMT.MAT_PR+EMP_AMT.EMP_SAL)) AS ProfitLoss FROM MAT_AMT,EMP_AMT,ORDERS;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});*/

con.connect(function(err) {
  if (err) throw err;
  SET @CP = (SELECT MAT_AMT.MAT_PR+EMP_AMT.EMP_SAL from MAT_AMT,EMP_AMT);
  SET @DIFF =(SELECT SUM(total_amt)-(@CP) FROM ORDERS);
  SET @PL = (@DIFF*100)/ (@CP) ;
  SET @RES = IF(@PL>0,'PROFIT','LOSS');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});






/*con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT CAST(MAT_AMT.MAT_PR AS DECIMAL(16,2)) AS MaterialCost,CAST(EMP_AMT.EMP_SAL AS DECIMAL(16,2))AS TotalEmployeeSalary,CAST(SUM(total_amt) AS DECIMAL(16,2)) AS SellingPrice, CAST(@CP AS DECIMAL(16,2)) AS CostPrice, CAST(@DIFF AS DECIMAL(16,2)) AS ProfitLoss, CAST(ABS(@PL) AS DECIMAL(16,2)) AS Percentage, @RES AS Result FROM MAT_AMT,EMP_AMT,ORDERS";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});*/



/*con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT (SUM(total_amt)-((MAT_AMT.MAT_PR)+(EMP_AMT.EMP_SAL))) AS ProfitLoss FROM MAT_AMT,EMP_AMT,ORDERS;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/


















/*con.connect(function(err) {
  if (err) throw err;
  var sql = "SET GLOBAL sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});*/