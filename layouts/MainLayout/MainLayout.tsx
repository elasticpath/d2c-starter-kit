import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import MainMenu from "../../components/MainMenu/MainMenu";
import { getHierarchies } from "../../services/services";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainMenu />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
