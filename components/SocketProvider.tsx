import React from 'react';

const SocketContext = React.createContext(null);

export const SocketProvider = (props) => (
  <SocketContext.Provider value={props.socket}>
    {props.children}
  </SocketContext.Provider>
);

export const withSocketContext = (Component) => {
  const ComponentWithSocket = (props) => (
    <SocketContext.Consumer>
      {(socket) => <Component {...props} socket={socket} ref={props.onRef} />}
    </SocketContext.Consumer>
  );
  return ComponentWithSocket;
};