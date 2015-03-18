
var bridgeSocket = new WebSocket('ws://localhost:9090');

bridgeSocket.onerror = function () { console.log('ws error'); };

module.exports = {
    doSomething: function () {
        bridgeSocket.send('something');
    }
}
