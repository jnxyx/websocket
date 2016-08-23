var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8081
    });

var userId = [];
var wsArray = [];
var recordArray = [];

wss.on('connection', function(ws) {
    try {

        wsArray.push(ws);

        if (!ws.id) {
            ws.id = parseInt(100000 * Math.random());
            userId.push(ws.id);
            sendToAll('the ' + ws.id + ' come in , welcome！');
            sendToAll(ws, 'hello everyone i\'m ' + ws.id);
        }

        ws.on('message', function(message) {
            recordArray.push(ws.id + ' : ' +
                message);
            sendToAll(ws, message)
            console.log('received: %s', message);
        });

        ws.on('close', function(evt) {
            console.log(evt);
            console.log('disconnected!');
        });

    } catch (e) {
        console.log(e);
    }

});

function sendToAll(ws, message) {
    var msg = '',
        me = '';
    if ('object' == typeof ws) {
        msg += ws.id + ':';
        me += 'me ' + ':';
    } else {
        msg += 'system info ';
        me += 'system info ';
        message = ws;
    }
    msg += message;
    me += message;

    for (var i = 0; i < wsArray.length; i++) {
        if (ws.id == wsArray[i].id) {
            wsArray[i].send(me);
        } else {
            try {
                wsArray[i].send(msg);
            } catch (e) {
                wsArray.splice(i, 1);
                console.log(e);
                console.log(wsArray[i].id + ' was gone!');
            }
        }
    }
}
