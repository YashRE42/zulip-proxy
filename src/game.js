const WebSocket = require('ws');

let player_seq = 100;

exports.get_info = (info, user) => {
    if (info && info.user.user_id == user.user_id) {
        // just update the name
        info.user.name = user.name;
        return info;
    }

    player_seq += 1;

    const new_info = {
        player_id: player_seq,
        user: {
            user_id: user.user_id,
            name: user.name,
        },
    };

    return new_info;
};

exports.handle_ws_server = (server) => {
    server.on('connection', (client) => {
        console.log('connected');
        console.log('client Set length: ', server.clients.size);

        client.on('close', (client) => {
            console.log('closed');
            console.log('Number of clients: ', server.clients.size);
        });

        client.on('message', (message) => {
            console.info('about to broadcast', JSON.stringify(message));
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
    });
};
