const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();


app.engine('handlebars', expressHandlebars.engine({
  defaultLayout :"main",
  helpers : {
    section: function(name, options){
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this);
      return null;
    }
  }
}))