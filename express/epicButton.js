var express=require('express');
var app=express();
//set static folder
app.use(express.static(__dirname+'/static'));
//set view folder
app.set('views',__dirname+'/views')
app.set('view engine','ejs');
app.get('/',function(req,res){
  res.render('epicButton');
});
//start a server
var server=app.listen(8000,function(){
  console.log('listen on port 8000')
});
var count=0;
var io=require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
  socket.on('click_button',function(data){
    count++;
    io.emit('update_message',{count:count});
  });
  socket.on('reset',function(date){
    count=0;
    io.emit('update_message',{count:count});
  });
});
