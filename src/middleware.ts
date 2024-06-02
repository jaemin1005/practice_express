import express = require("express");
// import * as express from "express"

const app = express();

app.use((req, res, next) => {
  console.log("\n\nAllWAYS");
})

app.get("/a", (req, res) => {
  console.log('\a: route terminated');
  res.send('a');
})

app.get("/a", (req,res) => {
  console.log('/a: naver called');
})

app.get('/b', (req, res, next) => {
  console.log(`/b: route not terminated`);
})

app.use((req, res, next)=> {
  console.log("SOMETIMES");
  next();
})

app.get('/b', (req, res, next)=> {
  console.log('/b (part 2): error thrown');
  throw new Error('b failed');
})

app.use('/b', (err : Error, req : express.Request, res : express.Response, next : express.NextFunction) => {
  console.log('/b error detected and passed on');
  next(err);
});

app.use('/c', (err,req) => {
  console.log('/c: error thrown');
  throw new Error('c Failed');
})

app.use('/c',(err : Error, req : express.Request, res : express.Response, next : express.NextFunction)  => {
  console.log('/c: error detected but not passed on');
  next();
})

app.use((err : Error, req : express.Request, res : express.Response, next : express.NextFunction)  => {
  console.log('unhandled error detected: ' + err.message);
  res.send('500 - sever error');
})

app.use((req, res) => {
  console.log('route not handled');
  res.send('404-not found');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}` + ': press Ctrl+C to terminate.')
});