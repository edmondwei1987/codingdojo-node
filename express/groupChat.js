var express=require('express');
var app=express();
var bodyPaser=require('body-parser');
app.use(bodyPaser.urlencoded());
app.use(express.static(__dirname+'/static'));
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.get('/',function(req,res){
  res.render('chatIndex');
});
app.post('/chatRoom',function(req,res){
  res.render('chatRoom',{'id':req.body.id});
});
var server=app.listen(8000,function(){
  console.log('listen on port 8000');
})
var users={};
var messages=['welcome to Node chat!'];
var io=require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
  socket.on('join',function(data){
    // users.push({'id':data.name});
    let id=data.name+Math.floor(Math.random()*100);
    users[id]=data.name;
    socket.emit('enter',{id:id});
    socket.broadcast.emit('new',{name:data.name});
  });
  socket.on('show',function(data){
    socket.emit('messages',{messages:messages});
  });
  socket.on('send_message',function(data){
    let message=users[data.id]+':'+data.msg;
    messages.push(message);
    io.emit('add_message',{msg:message});
  });
  socket.on('discon',function(data){
    socket.broadcast.emit('user_disconnect',{user:users[data.id]});
    delete users[data.id];
  });
});
