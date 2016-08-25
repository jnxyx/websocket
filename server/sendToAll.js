function sendToAll(ws, message, wsArray) {
    var msg = '',
        me = '';
    if ('object' == typeof ws) {
        msg += ws.id + ':';
        me += 'me ' + ':';
    } else {
        msg += 'system info ';
        me += 'system info ';
        wsArray = message;
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

module.exports = sendToAll;
