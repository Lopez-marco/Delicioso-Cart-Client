import React from "react";
import { Button, Form, Select } from "antd";

const { Option } = Select;

export interface UpdateStoreModalProps {
  store: Function;
  favoritestore: Function;
}

export interface UpdateStoreModalState {
  favorite_store: string;
  visible: boolean;
}

class UpdateStoreModal extends React.Component<
  UpdateStoreModalProps,
  UpdateStoreModalState
> {
  constructor(props: UpdateStoreModalProps) {
    super(props);
    this.state = { favorite_store: "", visible: false };
    this.UpdateStore = this.UpdateStore.bind(this);
  }

  UpdateStore() {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3001/user/user-update", {
      method: "PUT",
      body: JSON.stringify({
        user: {
          favorite_store: this.state.favorite_store,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    }).then((res) => {
      localStorage.setItem("favorite_store", this.state.favorite_store);
      this.setState({ favorite_store: this.state.favorite_store });
      this.refreshPage();
    });
    console.log(this.props.store);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  refreshPage() {
    window.location.reload(true);
  }

  handleOk = () => {
    this.UpdateStore();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Form>
          <Select
            defaultValue="Change Store"
            onChange={(value: string) =>
              this.setState({ favorite_store: `${value}` })
            }
            style={{ width: 130 }}
          >
            <Option value="target">Target</Option>
            <Option value="walmart">Walmart</Option>
            <Option value="meijer">Meijer</Option>
            <Option value="wholefoods">Whole Foods</Option>
            <Option value="familydollar">Family Dollar</Option>
            <Option value="freshmarket">Fresh Market</Option>
            <Option value="traderjoes">Trader Joe's</Option>
            <Option value="safewayfoods">SafeWay Foods</Option>
            <Option value="Saraga">Saraga</Option>
          </Select>

          <Button key="submit" type="primary" onClick={this.handleOk}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default UpdateStoreModal;
