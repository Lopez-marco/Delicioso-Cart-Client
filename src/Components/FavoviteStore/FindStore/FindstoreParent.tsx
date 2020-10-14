import * as React from "react";

export interface FindstoreParentProps {}

export interface FindstoreParentState {}

class FindstoreParent extends React.Component<
  FindstoreParentProps,
  FindstoreParentState
> {
  constructor(props: FindstoreParentProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <div></div>;
  }
}

export default FindstoreParent;
