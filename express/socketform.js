var express=require('express');
var path=require('path');
var app=express();
app.use(express.static(path.join(__dirname,'./static')));
// app.use(express.static(__dirname + "/static"));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');
var server=app.listen(8000,function(){
  console.log('listening on port 8000');
})
app.get('/',function(req,res){
  res.render('reform');
});

var io=require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
  socket.on('posting_form',function(data){
    var message={msg:data.name+data.location,random:Math.floor(Math.random()*1000)}
    socket.emit('update_message',message);
  });
});
