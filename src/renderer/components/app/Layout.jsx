import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

const Layout = (props) => {
  return (
    <div className="container">
      <Sidebar />
      <Content contents={props.contents} />
    </div>
  )
}

export default Layout;
