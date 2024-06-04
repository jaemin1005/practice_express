import cluster from "cluster"
import os from "os"
import StartServer from "../ClusterServer";

function startWorker(){
  const worker = cluster.fork();
  console.log(`CLUSTER: Worker ${worker.id} started`);
}

if(cluster.isPrimary){
  os.cpus().forEach(startWorker);

  cluster.on("disconnect", worker => console.log(`CLUSTER: Worker ${worker.id} disconnected from the cluster`));
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `CLUSTER: Worker ${worker.id} died with exit ` + `code ${code} (${signal})` 
    )
    startWorker();
  })
}
else{
  let port = process.env.PORT || 3000
  if(typeof port === "string")
    port =Number(port)

  StartServer(port);
}