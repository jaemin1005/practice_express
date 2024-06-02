import rl = require("readline");
let url = "http://localhost:3000/";

const readLine = rl.createInterface({
  input : process.stdin,
  output : process.stdout
});

function fetchGET(){
  readLine.question("보낼 데이터를 입력해주세요.", async (anwer) => {
    let res = await fetch(url+anwer);
    console.log(res);
    fetchGET();
  })
}


fetchGET();