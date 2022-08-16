import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import type { ReactNode } from "react";
import type { NavigationNode } from "../../components/header/navigation/build-site-navigation";

interface IMainLayout {
  nav: NavigationNode[];
  children: ReactNode;
}

const MainLayout = ({ nav, children }: IMainLayout): JSX.Element => {
  return (
    <>
      <Header nav={nav} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
