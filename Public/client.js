//client side
const socket = io('ws://localhost:3000');

//if client is connected, add the users to the active list socket
socket.connect();
socket.on('connect', ()=>{
    console.log('User connected');
    let user = document.getElementById('client');
    socket.emit('connected-user', user.value);
    socket.emit('active-list', user.value);
})

//this will display to the global message, a container containing connection of a user
socket.on('connected-user', user=>{
    //for global connected
    divConnect(user, 'globalMsg-holder');
    removeDuplicate('globalMsg-holder', 'connect-container-' + user);
})

//for removing duplicates
function removeDuplicate(parentID, containerID){
    let parentDiv = document.getElementById(parentID);

    //delete duplicate but only leave one
    let countID = 0;

    for(let i = 0; i < parentDiv.childElementCount; i++){
        const child = parentDiv.children[i];
        const childID = child.id;

        //check if the child id has duplicate
        if(childID == containerID){
            countID++;

            //if the id has duplicate, remove it but leave only one
            if(countID > 1){
                countID--;
                parentDiv.removeChild(document.getElementById(containerID));
                i--;
            }
        }
    }
}

//if user connected
function divConnect(user, holder){
    //parent div of the global messages
    let parentDiv = document.getElementById(holder);

    //this is the container for the connected div
    let container = document.createElement('div');
    container.setAttribute('class', 'py-3 bg-[#F6F4EB] h-fit border-solid border-0 rounded-2xl mt-3');
    container.setAttribute('id', 'connect-container-' + user);

    //this is the notification for the user if it is connected
    let username_p = document.createElement('p');
    username_p.setAttribute('class', 'font-[courier] w-full text-[#4682A9] font-bold text-sm text-center');
    username_p.appendChild(document.createTextNode(user + " Connected"));

    //add the name to the container
    container.appendChild(username_p);

    //append the container to the parent
    parentDiv.appendChild(container);
}

//for global message, if a user send a message
function sendMessageGlobal(){
    let user = document.getElementById('client');
    let msgInput = document.getElementById('globalMsgInput');

    sendMessage('globalMsgInput', 'globalMsg-holder');
    socket.emit('message', msgInput.value, user.value);

    document.getElementById('globalMsgInput').value = "";
}

//for private message, if a user send a message
function sendMessagePrivate(input, holder, receiver){

    //send the receiver to the server side for private messaging
    let msgInput = document.getElementById(input);
    let user = document.getElementById('client');

    socket.emit('private-message', msgInput.value, user.value, receiver);
    sendMessage(input, holder);

    document.getElementById(input).value = "";
}

//sending message
function sendMessage(input, msgHolder){
    let msgInput = document.getElementById(input);

    if(msgInput.value.length > 0){
        //parent div of the global messages
        let parentDiv = document.getElementById(msgHolder);

        //wrapper for the message
        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'mt-3');

        //this contain info of a user
        let p = document.createElement('p');
        p.setAttribute('class', 'font-[courier] text-[#4682A9] font-bold text-sm text-right');
        p.appendChild(document.createTextNode('You said:'));

        wrapper.appendChild(p);

        //this is a container for the content of the message
        let container = document.createElement('div');
        container.setAttribute('class', 'py-3 bg-[#91C8E4] w-full h-fit border-solid border-0 rounded-2xl p-3');

        let messageDiv = document.createElement('p');
        messageDiv.setAttribute('class', 'font-[courier] text-[#4682A9] text-sm text-left');
        messageDiv.appendChild(document.createTextNode(msgInput.value));
    
        container.appendChild(messageDiv);
        wrapper.appendChild(container);
        parentDiv.appendChild(wrapper);

        //make scrollbar set to bottom when sending message
        parentDiv.scrollTop = parentDiv.scrollHeight - parentDiv.clientHeight;
    }
}

//for global message, if user recieve a message
let num1 = 0;
socket.on('message', (message, user)=>{
    //current user
    let curUser = document.getElementById('client');

    //check if a user and a client is the same
    if(curUser.value != user){
        num1 += 1;
    }
    receiveMessage('globalMsg-holder', user, 'bubbleNotifGlobal', 'globalCurrMsg', 'text-bubbleGlobal', message, num1);
})

//for private message, if user recieve a message
let num2 = 0;
socket.on('private-message', (message, sender, receiver)=>{
    //check if a user and a client is the same
    let user = document.getElementById('client');

    if(user.value == receiver){
        num2 += 1;

        receiveMessage('private-holder-Msg-' + sender, sender, 'bubbleNotifPrivate-' + sender, 'privateCurrMsg-' + sender, 'text-bubblePrivate-' + sender, message, num2);
    }
})

function receiveMessage(holder, user, bubbleDivGlobal, bubbleDivText, textCount, message, num){
    let curUser = document.getElementById('client');

    //parent div of the global messages
    let parentDiv = document.getElementById(holder);

    //wrapper for the message
    let wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'mt-3');

    //this contain info of a user
    let p = document.createElement('p');

    //check if a user and a client is the same
    if(curUser.value == user){
        p.setAttribute('class', 'font-[courier] text-[#4682A9] font-bold text-sm text-right');
        p.appendChild(document.createTextNode('You said:'));
    }
    else{
        p.setAttribute('class', 'font-[courier] text-[#4682A9] font-bold text-sm text-left');
        p.appendChild(document.createTextNode(user + ' said:'));
    }

    wrapper.appendChild(p);

    //this is a container for the content of the message
    let container = document.createElement('div');

    //check if a user and a client is the same
    if(curUser.value == user){
        container.setAttribute('class', 'py-3 bg-[#91C8E4] w-full h-fit border-solid border-0 rounded-2xl p-3');
    }
    else{
        container.setAttribute('class', 'py-3 bg-[#F6F4EB] w-full h-fit border-solid border-0 rounded-2xl p-3');
    }

    let messageDiv = document.createElement('p');
    messageDiv.setAttribute('class', 'font-[courier] text-[#4682A9] text-sm text-left');
    messageDiv.appendChild(document.createTextNode(message));

    if(curUser.value != user){
        //override the message and make it bold
        document.getElementById(bubbleDivText).innerHTML = message.substr(0,5) + '...';
        document.getElementById(bubbleDivText).style.fontWeight = 'bold';
    }

    if(num > 0){
        //this is the bubble notification
        document.getElementById(bubbleDivGlobal).style.display = 'block';
        document.getElementById(textCount).innerHTML = num.toString();
    }
    
    container.appendChild(messageDiv);
    wrapper.appendChild(container);
    parentDiv.appendChild(wrapper);

    //make scrollbar set to bottom when sending message
    parentDiv.scrollTop = parentDiv.scrollHeight - parentDiv.clientHeight;
}

//if a user click any of the active list, pass the parameter to the name of it
socket.on('private-user', receiver=>{
    //show the box
    document.getElementById('privateMsg-' + receiver).style.display = 'block';
})

//if a client is active
socket.on('active-list', user=>{
    panelPrivateMessage(user);

    //remove duplicates
    let parentPanelHolder = document.getElementById('private-panel-holder');
    removeDuplicate(parentPanelHolder.id, 'privateMsg-' + user);

    //parent div, this is the container of the message
    let activeParent = document.getElementById('active-parent');

    //inside of the activeParent
    let parentDiv = document.createElement('div');
    parentDiv.setAttribute('class', 'border-solid border-0 bg-white w-full h-fit p-4 my-5 cursor-pointer hover:bg-[#DCDCDC]');
    parentDiv.setAttribute('id', 'private-msg-holder_' + user);
    parentDiv.setAttribute('onclick', "openCloseDiv('private-panel-holder', 'block', 'private', this)");

    //this is the username display
    let username_p = document.createElement('p');
    username_p.setAttribute('class', 'font-[courier] text-[#4682A9] font-bold text-lg text-center');
    username_p.setAttribute('id', 'user-client-' + user);
    username_p.appendChild(document.createTextNode(user));
    parentDiv.appendChild(username_p);

    //this another child parent will hold the two element, a current text message and the notification bubble
    let child_div_holder = document.createElement('div');
    child_div_holder.setAttribute('class', 'flex justify-between items-center');
    child_div_holder.setAttribute('id', 'private-msg-holder');

    //this is the current text message display
    let currentMsg = document.createElement('p');
    currentMsg.setAttribute('class', 'font-[courier] text-[#4682A9] text-sm');
    currentMsg.setAttribute('id', 'privateCurrMsg-' + user);  
    child_div_holder.appendChild(currentMsg);

    //this is the bubble notification
    let bubbleNotif = document.createElement('div');
    bubbleNotif.setAttribute('class', 'w-8 h-8 border-solid border-0 bg-[#749BC2] rounded-full flex items-center p-2 hidden');
    bubbleNotif.setAttribute('id', 'bubbleNotifPrivate-' + user);

    //this is the bubble text
    let bubble_text = document.createElement('p');
    bubble_text.setAttribute('class', 'font-[courier] text-[10px] text-white text-center');
    bubble_text.setAttribute('id', 'text-bubblePrivate-' + user);
    bubbleNotif.appendChild(bubble_text);

    //now parent them to the child holder
    child_div_holder.appendChild(bubbleNotif);
    parentDiv.appendChild(child_div_holder);
    activeParent.appendChild(parentDiv);

    removeDuplicate(activeParent.id, 'private-msg-holder_' + user);
})

//for a div private message of a active list
function panelPrivateMessage(receiver){
    //create the parent
    let parentDiv = document.createElement('div');
    parentDiv.setAttribute('class', 'hidden');
    parentDiv.setAttribute('id', 'privateMsg-' + receiver);

    //wrapper for second wrapper use for title and stuff
    let wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('class', 'flex justify-center');
    parentDiv.appendChild(wrapperDiv);

    //second wrapper for the title
    let wrapperDiv2 = document.createElement('div');
    wrapperDiv2.setAttribute('class', 'py-3 bg-[#F6F4EB] h-[30rem] w-[15rem] border-solid border-0 rounded-2xl md:w-[20rem] md:h-[25rem] md:py-1');

    wrapperDiv.appendChild(wrapperDiv2);

    //title of the panel
    let titleWrapper = document.createElement('div');
    titleWrapper.setAttribute('class', 'flex justify-center md:justify-around');

    //title
    let panelTitle = document.createElement('p');
    panelTitle.setAttribute('class', 'font-[courier] text-[#4682A9] font-bold text-lg text-center m-4');
    panelTitle.appendChild(document.createTextNode(receiver));

    //close button
    let closeButton = document.createElement('button');
    closeButton.setAttribute('class', 'font-[courier] font-bold text-[#4682A9]');
    closeButton.setAttribute('onclick', "openCloseDiv('privateMsg-" + receiver + "', 'none', 'private', this)");
    closeButton.innerHTML = '&#10006';

    //wrap the title and the button to the wrapper
    titleWrapper.appendChild(panelTitle);
    titleWrapper.appendChild(closeButton);

    wrapperDiv2.appendChild(titleWrapper);

    //the wrapper for conversation holder
    let messageWrapper = document.createElement('div');
    messageWrapper.setAttribute('class', 'flex justify-center');

    //the holder of all conversation
    let messageHolder = document.createElement('div');
    messageHolder.setAttribute('class', 'bg-white border-solid border-0 rounded-2xl p-3 w-[13rem] h-[18rem] overflow-y-auto md:w-[18rem] md:h-[15rem]');
    messageHolder.setAttribute('id', 'private-holder-Msg-' + receiver);

    messageWrapper.appendChild(messageHolder);

    wrapperDiv2.appendChild(messageWrapper);

    //the wrapper for inputs and send buttons
    let wrapperInput = document.createElement('div');
    wrapperInput.setAttribute('class', 'mt-5 flex justify-center md:justify-around');

    //the input and the buttons
    let textArea = document.createElement('textarea');
    textArea.setAttribute('class', 'p-3 border-solid border-2 border-[#4682A9] rounded-2xl font-[courier] text-center text-sm text-[#4682A9]');
    textArea.setAttribute('id', 'privateMsgInput-' + receiver);
    textArea.setAttribute('cols', '15');
    textArea.setAttribute('rows', '2');
    textArea.setAttribute('placeholder', 'Message...');

    wrapperInput.appendChild(textArea);

    let sendButton = document.createElement('button');
    sendButton.setAttribute('class', 'text-[#4682A9] m-2');
    sendButton.setAttribute('onclick', "sendMessagePrivate('privateMsgInput-" + receiver + "', 'private-holder-Msg-" + receiver + "', '"+ receiver + "')");

    let icon = document.createElement('i');
    icon.setAttribute('class', 'material-icons');
    icon.appendChild(document.createTextNode('send'));

    sendButton.appendChild(icon);
    wrapperInput.appendChild(sendButton);

    wrapperDiv2.appendChild(wrapperInput);

    //append to the parent
    document.getElementById('private-panel-holder').appendChild(parentDiv);
}

function openCloseDiv(message, display, type, div){
    document.getElementById(message).style.display = display;
    
    if(type == 'global'){
        document.getElementById('globalCurrMsg').style.fontWeight = 'lighter';

        //make scrollbar set to bottom when sending message
        let parentDiv = document.getElementById('globalMsg-holder');
        parentDiv.scrollTop = parentDiv.scrollHeight - parentDiv.clientHeight;

        //set the notification bubble to zero
        document.getElementById('bubbleNotifGlobal').style.display = 'none';
        document.getElementById('text-bubbleGlobal').innerHTML = '';
    }
    if(type == 'private'){
        //add the user name to the div of message
        if(div.id != ''){
            socket.emit('private-user', div.id);

            //set the session for the receiver
            sessionStorage.setItem('receiver', div.id);

            let receiver = sessionStorage.getItem('receiver');
            let id = receiver.substring(19, sessionStorage.getItem('receiver').length);
            document.getElementById('privateCurrMsg-' + id).style.fontWeight = 'lighter';

            //set the notification bubble to zero
            document.getElementById('bubbleNotifPrivate-' + id).style.display = 'none';
            document.getElementById('text-bubblePrivate-' + id).innerHTML = '';
        }
    }
}

//if user log out
function socketOut(){
    let user = document.getElementById('client');
    socket.emit('user-left', user.value);

    fetch('Public/logoutValidation.php');
    location.href = 'Public/frontPage.php';
}

//if client left the socket
socket.on('user-left', user=>{
    let activeParent = document.getElementById('active-parent');

    //for global chat
    divLeft(user, 'globalMsg-holder', 'divContainer');
    removeDuplicate('globalMsg-holder', 'divContainer');

    //remove the container to the active list
    activeParent.removeChild(document.getElementById('private-msg-holder_' + user));
})

//user left div
function divLeft(user, holder, containerHolder){
    //parent div of the messages
    let parentDiv = document.getElementById(holder);

    //this is the container for the connected div
    let container = document.createElement('div');
    container.setAttribute('class', 'py-3 bg-[#F6F4EB] h-fit border-solid border-0 rounded-2xl mt-3');
    container.setAttribute('id', containerHolder);

    //this is the notification for the user if it is connected
    let username_p = document.createElement('p');
    username_p.setAttribute('class', 'font-[courier] w-full text-[#4682A9] font-bold text-sm text-center');
    username_p.appendChild(document.createTextNode(user + " disconnected"));

    //add the name to the container
    container.appendChild(username_p);

    //append the container to the parent
    parentDiv.appendChild(container);
}