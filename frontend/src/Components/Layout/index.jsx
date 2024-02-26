import React from "react";
import Navbar from "../Header";

const Layout = ({ navbar = true, children }) => {
  return (
    <>
      {" "}
      {navbar && <Navbar />}
      <div>{children}</div>
    </>
  );
};

export default Layout;
