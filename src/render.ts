import express = require("express");
import expressHandlebars = require("express-handlebars");
import cookieParser = require("cookie-parser");
import path = require("path");
import { ICredential } from "./interface/ICredential";
const credentials : ICredential = require("../.credentials.development");


const app = express();

// 핸들바 뷰 엔진 설정 :)
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}));
app.set("view engine", 'handlebars');

//* 쿠키 테스트 :)
app.use(cookieParser(credentials.cookieSecret));

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