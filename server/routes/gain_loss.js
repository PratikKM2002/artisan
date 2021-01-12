import { con } from "../db/db.js"
import express from 'express';
var router = express.Router()

router.use('/', () => {
  console.log('In /GainLoss file')
})

export default router;

