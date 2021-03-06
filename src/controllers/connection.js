import JsonController from './json';

class ConnectionController extends JsonController {
  constructor(client, sourceId, destinationId) {
    super(client, sourceId, destinationId, 'urn:x-cast:com.google.cast.tp.connection');
    const onMessage = (data) => {
      if (data.type === 'CLOSE') this.emit('disconnect');
    };
    const onClose = () => {
      this.removeListener('message', onMessage);
    };
    this.on('message', onMessage);
    this.once('close', onClose);
  }

  /**
   * Connect
   */
  connect() {
    this.send({
      type: 'CONNECT'
    });
  }

  /**
   * Disconnect
   */
  disconnect() {
    this.send({
      type: 'CLOSE'
    });
  }
}

export default ConnectionController;
