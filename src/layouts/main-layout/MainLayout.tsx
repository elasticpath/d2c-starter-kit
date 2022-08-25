import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import type { ReactNode } from "react";
import type { NavigationNode } from "../../lib/build-site-navigation";

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
