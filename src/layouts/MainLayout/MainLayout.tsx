import Header, { INavigationNode } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import type { ReactNode } from "react";

interface IMainLayout {
  nav: INavigationNode[];
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
