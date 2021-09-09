import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

router.get('/', () => {
  console.log('Connected in /raw SignUp file')
})
router.post('/create', (req, res) => {
  console.log('In /SignUp2 file')
    var sql = `INSERT INTO SignUp(Email,Password) VALUES ('${req.body['Email']}', '${req.body['Password']}') `;
    //var sql = `INSERT INTO SignUp2(Email,Password) VALUES ('ron123rhea@gmail.com','bts_1234') `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("New User Added!!");
      res.json("Success!")
    });
})

router.get('/read', (req,res) => {
  console.log('In /SignUp2 file')
  con.query("SELECT * FROM SignUp2", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
  });
})
/*con.query("DELETE FROM SignUp2 WHERE EMAIL='nivedham2000@gmail.com' AND Password='password_1234' ", function (err, result, fields) {
  if (err) throw err;
  //console.log(result);
  console.log("Number of records deleted: " + result.affectedRows);
});*/
export default router;

