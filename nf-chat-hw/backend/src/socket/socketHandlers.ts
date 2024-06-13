import Message from "../message/model/Message";

export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('send_message', async (data) => {
      const { username, text, roomId, socketID = socket.id, messageId } = data;
      const message = new Message({ username, text, roomId, socketID, messageId });

      try {
        await message.save();
        io.to(roomId).emit('receive_message', data);
      } catch (err) {
        console.error('Error saving message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('User Disconnected ' + socket.id);
    });
  });
};
