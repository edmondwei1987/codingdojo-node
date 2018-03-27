// var http=require('http');
// var fs=require('fs');
// var server=http.createServer(function(request,response){
//   if(request.url==='/'){
//     fs.readFile();
//   }
// });

var express=require('express');
var session=require('express-session');
var app=express();
app.use(session({secret:'mysecretkey'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));

app.get('/',function(req,res){
  if('count' in req.session){
    req.session.count++;
  }else{
    req.session.count=0;
  }
  res.render('index',{'count':req.session.count});
});

app.get('/add2',function(req,res){
  if('count' in req.session){
    req.session.count++;
  }else{
    req.session.count=0;
  }
  res.redirect('/');
});

app.get('/reset',function(req,res){
  req.session.count=0;
  res.redirect('/');
})

app.listen(8000,function(){
  console.log('listen on port 8000.')
});
