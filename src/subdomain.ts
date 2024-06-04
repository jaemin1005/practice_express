import express from "express"
import vhost from "vhost"

const app = express();

const admin = express();
const adminRouter = express.Router();

// admin 서브 애플리케이션의 라우트를 정의합니다
adminRouter.get('/', (req, res) => {
  res.send('관리자 패널에 오신 것을 환영합니다');
});

admin.use(adminRouter);
app.use(vhost("localhost:3000",admin));



admin.get("*", (req,res) => {
  res.send("Welcome Admin");
})

// app.get("*", (req, res) => {
//   res.send("Welcome User");
// })

const port = 3000;

app.listen(port, () => console.log(
  "\nmake sure you've added the following to your hosts file:" +
  "\n" +
  "\n  127.0.0.1 admin.meadowlark.local" +
  "\n  127.0.0.1 meadowlark.local" +
  "\n" +
  "\nthen navigate to:" +
  "\n" +
  `\n  http://meadowlark.local:${port}` +
  "\n" +
  "\n and" +
  `\n  http://admin.meadowlark.local:${port}\n`))