import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
    return (
        <>
          <section>{children}</section>
          <Outlet />
        </>
      );
}

export default Layout