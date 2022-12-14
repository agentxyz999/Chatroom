$(window).on("load", function(){
    let user_name = prompt("What is your name? ");
    $(document).ready(function(e){
        const socket = io();
        //new user connected
        socket.emit('new_user', user_name);

        socket.on('connected_user', data =>{
            let p = document.createElement('p');
            p.innerText = data.user_name;
            $('#user-list').append(p);
            // console.log(data.socket_id);
        });

        //send button clicked / form submitted
        $('#msg-form').on('submit', function(e){
            e.preventDefault();
            let recipient = document.getElementById('recipient');
            let msg = document.getElementById('msg');
            msg = msg.value;
            let recipient_name = recipient.value;
            socket.emit('sending_msg', {user_name: user_name, msg: msg, recipient: recipient_name});
            $(this).trigger('reset'); //reset chatbox after sending msg
            return false;
        });

        socket.on('send_msg_all', function(data){
            let h2 = document.createElement('h2');
            let p = document.createElement('p');
            console.log(data);
            for(x in data){
                h2.innerText = `${data[x].user_name} to Everyone: \n`;
                if(data.data.msg !== undefined){
                    p.innerText = `${data[x].msg}`;
                    $('#user-msg').append(h2).append(p);
                } 
            }
        });
        //doesnt work atm
        socket.on('private_msg', data =>{
            console.log(data.msg);
        });
    });
});