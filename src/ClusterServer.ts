import express from "express";
import cluster from "cluster";

const app = express();

app.use((req, res, next) => {
  if(cluster.isWorker){
    console.log(`Worker ${cluster.worker!.id} received request`);
  }
  next();
});


app.get("/fail", (req,res) => {
  throw new Error("Nope")
});

app.get("/epic-fail", (req,res) => {
  process.nextTick(() => {
    throw new Error("Kaboom!");
  });
  res.send("embarrased");
})

process.on("uncaughtException", err => {
  console.error('UNCAUGHT EXCEPTION\n', err.stack);
  process.exit(1)
})

function StartServer(port : number){
  app.listen(port, function(){
    console.log(`Express started in ${app.get('env')} ` +
    `mode on http://localhost:${port}` +
    `; press Ctrl-C to terminate.`)
  })
}

if(require.main === module){
  StartServer(3000);
}else{
  module.exports = StartServer;
}

export default StartServer;