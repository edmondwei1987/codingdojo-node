var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/static"));
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.get('/',function(req,res){
  res.render('form');
});
app.post('/result',function(req,res){
  let context={
    'name':req.body.name,
    'location':req.body.location,
    'language':req.body.language,
    'comment':req.body.comment,
  }
  res.render('result',context);
});
app.listen(8000,function(){
  console.log('start project on port 8000.')
});
