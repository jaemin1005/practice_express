import express = require("express");
import expressHandlebars = require("express-handlebars");
import cookieParser = require("cookie-parser");
import path = require("path");
import { ICredential } from "./interface/ICredential";
import expressSession = require("express-session");
import morgan = require("morgan");
import fs = require("fs");

const credentials : ICredential = require("../.credentials.development");
const app = express();

// 핸들바 뷰 엔진 설정 :)
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}));
app.set("view engine", 'handlebars');
    
//* 쿠키 테스트 :)
//* 쿠키 미들웨어는 세션 미들웨어보다 먼저 연결해야 한다.
app.use(cookieParser(credentials.cookieSecret));

app.use(expressSession({
  resave : false,
  saveUninitialized : false,
  secret : credentials.cookieSecret
}))

switch(app.get("env")){
  case "development":
    app.use(morgan("dev"));
    break;
  case "production":
    const stream = fs.createWriteStream(__dirname + "/access.log", { flags: "a"})
    app.use(morgan("combined", {stream}))
    break;
}



app.get("/", (req, res) => {
  res.cookie("monster", "nom nom");
  res.cookie("signed_monster", "nom nom", {signed : true});
  res.render('home');
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.use((req, res) => {
  res.status(404);
  res.render("404");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}` + ': press Ctrl+C to terminate.')
});