import React from 'react';
import ShoppingList from './Components/ShoppingList/ShoppingList';

export interface AppProps {}

export interface AppState {
  sessionToken: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { 
      sessionToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwODEzMTM0LCJleHAiOjE2MDM0MDUxMzR9.O09Q61OU3S8eZzoDqpFfRQXvKKfgwWQe9Bd3qrRfNM4',
    };
  }


  render() {
    return (<ShoppingList token={this.state.sessionToken} />);
  }
}

export default App;
