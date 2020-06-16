/* eslint-disable no-param-reassign */
import SocketIo from 'socket.io-client';


class SocketPlugin {
  constructor({ url, options }) {
    this.io = SocketPlugin.connect(url, options);
  }

  install(Vue) {
    Vue.prototype.$socket = this.io; // будет доступно в любой компаненте  через this.$socket
  }

  static connect(connection, options) {
    const io = SocketIo(connection, options);
    return io;
  }
}

export default SocketPlugin;
