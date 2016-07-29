var ws = new WebSocket("ws://127.0.0.1:8081/");
//var ws = new WebSocket("ws://173.16.51.87:8081/");

function initWebSocket() {
	ws.onopen = function() {
		console.log("Opened");
		//ws.send("I'm client1");
	};

	ws.onmessage = function(evt) {
		console.log(arguments);
		console.log(evt.data);
		addHtml(evt.data, false);
	};

	ws.onclose = function(e) {
		console.log(e);
		console.log("Closed");
	};

	ws.onerror = function(err) {
		console.log("Error: " + err);
	};
}

function addHtml(msg, from) {
	var message = '<p>';
	message += msg;
	message += '</p>';

	$('#content').append(message);
}

function initPage() {
	initWebSocket();
	$('#sub').click(function() {
		var msg = $('#input').val();
		$('#input').val('');
		ws.send(msg);
	});
}

$(initPage);