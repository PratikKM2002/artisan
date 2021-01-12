import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

router.use('/', () => {
  console.log('In /order file')
})

router.post('/create', (req, res) => {
  console.log('In /order file')
    var sql = `INSERT INTO ORDERS(order_status,total_amt,dist_id,date_placed,date_delivered) VALUES ('${req.body['OrderStatus']}', '${req.body['DistID']}', '${req.body['DatePlaced']}','${req.body['DateDelivered']}') `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json({
        "status_id": 1,
        "response": "Data inserted successfully"
      })
    });
})

router.post('/update', (req,res) => {
  console.log('In /order file')
 
    var sql = `UPDATE ORDERS SET order_status = '${req.body['NewOrderStatus']}' WHERE order_status = '${req.body['OldOrderStatus']}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  
})

router.post('/delete', (req,res) => {
  console.log('In /order file')
    var sql = `DELETE FROM ORDERS WHERE order_status = '${req.body['DOrderStatus']}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
})
router.get('/read', (req,res) => {
  console.log('In /order file')
  con.query("SELECT * FROM ORDERS", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
  
});
})

//to insert the main information regareding an order
router.post('/create', (req, res) => {
  console.log('In /order file')
  var sql = `SELECT distributor_id FROM DISTRIBUTOR WHERE distributor_name='${req.body['DistributorName']}' `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    var date;
    if(req.body.DateDelivered!=null){
      date="'"+req.body['DateDelivered']+"'"; //to convert it into string format
    }
    else
      date=req.body['DateDelivered']; //if it is null don't do anything
    var sql = `INSERT INTO mydb.ORDER (order_status,total_amt,dist_id,date_placed,date_delivered) VALUES ('${req.body['OrderStatus']}','${req.body['TotalAmt']}', '${result[0].distributor_id}', '${req.body['DatePlaced']}',${date}) `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      con.query("SELECT LAST_INSERT_ID() AS ID ", function (err, result, fields) { //returning the order_id of the last inserted order
        console.log(result[0].ID)
        res.json(result)
      })
    });
  })
});

//
router.post('/update', (req,res) => {
  console.log('In /order file')
  
  var sql = `SELECT distributor_id FROM DISTRIBUTOR WHERE distributor_name='${req.body['NewDistributorName']}' `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    var date;
    if(req.body.NewDateDelivered!=null){
      date="'"+req.body['NewDateDelivered']+"'";        //to convert it into string format
    }
    else
      date=req.body['NewDateDelivered'];                  //if it is null don't do anything

      //update required attributes of the order

    var sql = `UPDATE mydb.ORDER SET order_status = '${req.body['NewOrderStatus']}',total_amt='${req.body['NewTotalAmount']}',dist_id='${result[0].distributor_id}',date_placed='${req.body['NewDatePlaced']}',date_delivered=${date} WHERE order_id = '${req.body['OrderID']}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.json(result)
    });
  });
})

//to delete a particular order
router.post('/delete', (req,res) => {
  console.log('In /order file')
    var sql = `DELETE FROM mydb.ORDER WHERE order_id = '${req.body['DOrderID']}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
})

//to read all the order details
router.get('/read', (req,res) => {
  console.log('In /order file read')
  con.query("SELECT DISTINCT order_id,order_status,total_amt,distributor_name,date_placed,date_delivered FROM mydb.ORDER,DISTRIBUTOR WHERE dist_id=distributor_id", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
 
});
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