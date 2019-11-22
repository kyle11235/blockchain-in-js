import io from 'socket.io-client';
const socket = io('http://132.145.88.122:4000');

export const subscribeTo = (type, callback) => {
  socket.on('channel', function(data){
    if (data.type === type) {
      callback(data.payload)
    }
  })
}

export const publish = (type, payload) => {
  socket.emit('channel', { type, payload })
}
