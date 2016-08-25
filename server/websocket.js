var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8081
    }),
    sendToAll = require('./sendToAll');

var userId = [];
var wsArray = [];
var recordArray = [];

wss.on('connection', function(ws) {
    try {

        wsArray.push(ws);

        if (!ws.id) {
            ws.id = parseInt(100000 * Math.random());
            userId.push(ws.id);
            sendToAll('the ' + ws.id + ' come in , welcome！', wsArray);
            sendToAll(ws, 'hello everyone i\'m ' + ws.id, wsArray);
        }

        ws.on('message', function(message) {
            recordArray.push(ws.id + ' : ' +
                message);
            sendToAll(ws, message, wsArray);
            console.log('received: %s', message);
        });

        ws.on('close', function(evt) {
            for (var i = 0; i < wsArray.length; i++) {
                if (this === wsArray[i]) {
                    wsArray.splice(i, 1);
                }
            }
        });

    } catch (e) {
        
        console.log(e);
    }

});
