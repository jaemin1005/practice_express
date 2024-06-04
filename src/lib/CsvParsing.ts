import fs from "fs"

function CSVParsing(path : string){
  fs.readFile(path, "utf-8",(err, data) => {
    if(err) return 
    else{
      const obj = CsvFileIntoObj(data.toString());
      console.dir(obj);
      fs.writeFile("data.json", JSON.stringify(obj), "utf-8", ()=> {
        console.log("파일 쓰기 완료");
      })
    }
  })
}

function CsvFileIntoObj(data : string) : {[column : string] : {[column : string] : string}}{
  const rawRows = data.split("\n");
  
  const headers = rawRows[0].split(",");
  headers[headers.length-1] = headers[headers.length-1].slice(0,-1);


  const returnObj : {[column : string] : {[column : string] : string}} = {}

  // const raws = rawRows.slice(1).map(rowStr => rowStr.split(',').reduce(
  //   (row, val, i) => (row[headers[i]] = val, row), {} as {[column : string] : string}));

  rawRows.slice(1);

  for(let i = 0 ; i < rawRows.length ; i++){
    let rowStr = i === rawRows.length-1 ? rawRows[i] : rawRows[i].slice(0,-1);
    const split = rowStr.split(",");
    const curObj : {[column : string] : string} = {}

    for(let nIdx = 0; nIdx < split.length ; nIdx++){
      if(nIdx == 0) continue;
      curObj[headers[nIdx]] = split[nIdx];
    }
  
    returnObj[split[0]] = curObj;
  }



  return returnObj;
}

CSVParsing("EE.csv");