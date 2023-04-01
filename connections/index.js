const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const DB = process.env.DATABASE.replace(
  //如果有這個
  '<password>',
  //替換成這個
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB)
  .then(() => {
    console.log('連結資料庫成功')
  });