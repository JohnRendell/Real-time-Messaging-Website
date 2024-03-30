//Server side
const http = require('http').createServer();
const server = require('socket.io')(http, {cors: {origin: "*"}});

//map of clients
const clients = new Map();

//updating client list
function updateClient(){
    console.log("Current List: " + Array.from(clients.values()));
}

server.on('connect', socket=>{ 

    //add user to the connected list
    socket.on('connected-user', user=>{

        console.log(user + " Connected, Socket ID: " + socket.id.substr(0,5));

        //add the user to array and check if the user already there
        if(clients.has(user)){
            console.log('User already added');
        }
        else{
            clients.set(user, user);
        }

        //iterate to every socket online
        for(let [key, value] of clients){
            server.emit('connected-user', clients.get(key, value));
            user = clients.get(key, value);
        }
        updateClient();
    })

    //if a user send a message
    socket.on('message', (message, user)=>{
        socket.broadcast.emit('message', message, user);
    })

    //list of all active user
    socket.on('active-list', user=>{
        //iterate to every socket online
        for(let [key, value] of clients){
            user = clients.get(key, value);
            server.emit('active-list', user);
        }
    })

    //getting the user private id
    socket.on('private-user', receiver=>{
        let divID = receiver.substr(19, receiver.length);
        socket.emit('private-user', divID);
    })

    //if a user send a message via private message
    socket.on('private-message', (msg, sender, receiver)=>{
        socket.broadcast.emit('private-message', msg, sender, receiver);
    })

    //if a user left
    socket.on('user-left', user=>{
        for(let [key, value] of clients){
            if(clients.get(key, value) == user){
                server.emit('user-left', value);

                clients.delete(key);
                socket.disconnect();
            }
        }
        updateClient();
    })

    socket.on('disconnect', ()=>{
        console.log('Client disconnect');
        socket.disconnect();
    })
})

http.listen(3000, ()=>{console.log('Listening to port: 3000')});