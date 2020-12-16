import express from "express";
import body_parser from "body-parser";
import cors from "cors";
import http from "http";
import distributor from './routes/distributor.js'
import raw_materials from './routes/raw_materials.js'
import gain_loss from './routes/gain_loss.js'
import joined from './routes/joined.js'
import products from './routes/products.js'
import order from './routes/order.js'
import employee from './routes/employee.js'


const app = express()
const server = http.createServer(app)
const PORT = 5000

app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({
  urlencoded: true,
  extended:true
}))


app.use(function(req,res,next) {
      res.setHeader('Access-Control-Allow-Origin','*');
      res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
      res.setHeader('Access-Control-Allow-Headers','Authorization,Content-Type');
      res.setHeader('Access-Control-Allow-Credentials',true);
      next();
});

//creating a http server on PORT
server.listen(PORT,'127.0.0.0',() => console.log(`Server has started on PORT ${PORT}`))


//check if the server is up and running
app.get('/',(req,res) => {
  console.log("artisan ")
  res.send("Server is up")
  
})

//REGISTERING ROUTES
app.use('/distributor', distributor) // CRUD
app.use('/order',order) // 
app.use('/raw_materials',raw_materials)
app.use('/employee',employee)
app.use('/joined',joined)
app.use('/products',products)
app.use('/gain_loss',gain_loss)