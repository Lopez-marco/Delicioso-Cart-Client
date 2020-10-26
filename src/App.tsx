import React from "react";
import Auth from "./auth/Auth";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Index from "./Components/Index";
import jwt_decode from "jwt-decode";

export interface decodedToken {
  account_type: boolean;
}

export interface AppProps { }

export interface AppState {
  token: string;
  favorite_store: string;
  isAdmin: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    let decoded:decodedToken = {account_type: false};
    if(localStorage.getItem('token')) {
      decoded = jwt_decode(localStorage.getItem('token')!);
      console.log(decoded.account_type)
    }
    this.state = { token: "", favorite_store: "", isAdmin: decoded.account_type };
  }

  updateToken = (token: string) => {
    if (localStorage.getItem("token")) {
      this.setState({ token: token });
    }
    let decoded:decodedToken = jwt_decode(token);
    localStorage.setItem("token", token);
    this.setState({ token: token, isAdmin: decoded.account_type });
  };
  store = (favorite_store: string) => {
    if (localStorage.getItem("favorite_store")) {
      this.setState({ favorite_store: favorite_store });
    }
    localStorage.setItem("favorite_store", favorite_store);
    this.setState({ favorite_store: favorite_store });
  };
  ///If user has a token shows Index. NO token shows Login logout
  userLogin = () => {
    return localStorage.getItem("token") ? (
      <Router>
        <Index
          token={this.state.token}
          favorite_store={this.state.favorite_store}
          store={this.store}
          isAdmin={this.state.isAdmin}
        />
      </Router>
    ) : (
        <Auth
          token={""}
          favorite_store={""}
          updateUserRole={false}
          updateToken={this.updateToken}
          store={this.store}
        />
      );
  };

  render() {
    
    return <div>{this.userLogin()}</div>;
  }
}

export default App;
