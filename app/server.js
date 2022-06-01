const WebSocket = require('ws')


const usuarios = new Array();
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    let mess = JSON.parse(message);

    if(mess.tipo==1)
    {
      usuarios.push({msg:mess.nombre,socket:ws});

      for(i=0; i<usuarios.length; i++)
      {
      usuarios[i].socket.send(JSON.stringify(mess));
      }

    }else if(mess.tipo == 2)
    {
      for(let i=0; i<usuarios.length; i++)
      {
        usuarios[i].socket.send(JSON.stringify(mess));
      }
    }else if(mess.tipo == 3)
    {
      for(let i=0; i<usuarios.length; i++)
      {
        if(usuarios[i].msg==mess.dest)
        {
          usuarios[i].socket.send(JSON.stringify(mess));
        }
      }
    }
  })
});