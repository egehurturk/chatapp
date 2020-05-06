document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // Each button should emit a "submit vote" event
        document.querySelector('#form').onsubmit = () => {
                const messages = document.querySelector('#chatField').value; 
                
                socket.emit('submit message', {'messages': messages});
                document.querySelector('#chatField').value="";
                return false;
            };
        });
    

    // When a new vote is announced, add to the unordered list
    socket.on('announce messages', data => {
        const li = document.createElement('li');
        li.innerHTML = `${data.messages}`;
        document.querySelector('#messagesView').append(li);
    });

});


