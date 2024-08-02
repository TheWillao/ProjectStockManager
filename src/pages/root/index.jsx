import { Outlet } from "react-router-dom";
import Header from "../../components/header/index.jsx";
import Footer from "../../components/footer/index.jsx";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
