import express = require('express')
import expressHandlebars = require("express-handlebars");
const app = express()

// the following is needed to use views
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout : "main"
}))
app.set('view engine', 'handlebars')

// for images & other static files
app.use(express.static(__dirname + '/public'))


interface StaffMember {
  name: string;
  bio: string;
}

const staff : {[key in string] : StaffMember} = {
  mitch: { name: "Mitch",
    bio: 'Mitch is the man to have at your back in a bar fight.' },
  madeline: { name: "Madeline", bio: 'Madeline is our Oregon expert.' },
  walt: { name: "Walt", bio: 'Walt is our Oregon Coast expert.' },
}

app.get('/staff/:name', (req, res, next) => {
  const key = req.params.name
  const isExisted = Object.keys(staff).includes(key);	
  
  if(isExisted === false) return next()   // will eventually fall through to 404

  if(staff.hasOwnProperty(key))
    res.render('05-staffer', staff[key])
})

app.get('/staff', (req, res) => {
  res.render('05-staff', { staffUrls: Object.keys(staff).map(key => '/staff/' + key) })
})

app.get('*', (req, res) => res.send('Check out the "<a href="/staff">staff directory</a>".'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `\nnavigate to http://localhost:${port}/staff`))
