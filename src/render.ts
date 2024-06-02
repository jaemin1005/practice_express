import express = require("express");
import expressHandlebars = require("express-handlebars");
import path = require("path");

const app = express();

// 핸들바 뷰 엔진 설정 :)
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}));
app.set("view engine", 'handlebars');



app.get("/", (req, res) => {
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