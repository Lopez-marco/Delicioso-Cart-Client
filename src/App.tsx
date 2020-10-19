import React from "react";
import Auth from "./auth/Auth";
import { BrowserRouter as Router } from "react-router-dom";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import "./App.css";
import Index from "./components/Index";

export interface AppProps {}

export interface AppState {
  token: string;
  favorite_store: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { token: "", favorite_store: "" };
  }

  updateToken = (token: string) => {
    if (localStorage.getItem("token")) {
      this.setState({ token: token });
    }
    localStorage.setItem("token", token);
    this.setState({ token: token });
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
    return (
      <div>
        {this.userLogin()}

        {/* <Row gutter={[8, 48]}>
          <Col span={6} />
          <Col span={12} />
        </Row>
        <Row gutter={[16, 16]}>
          <Col></Col>
          <Col span={13}>
            <Card> Logo o webpage add or video</Card>
          </Col>
          <Col span={10}>
            <Card>
              <Auth
                token={""}
                favorite_store={""}
                updateUserRole={false}
                updateToken={this.updateToken}
                store={this.store}
              />
            </Card>
            <Col span={6} />
          </Col>
        </Row> */}

        {/* <ShoppingList token={this.state.token} /> */}
      </div>
    );
  }
}

export default App;
