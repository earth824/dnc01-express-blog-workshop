import 'dotenv/config';
import express from 'express';

const app = express();

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`server running on port: ${port}`);
});
