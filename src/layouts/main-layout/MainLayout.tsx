import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import type { ReactNode } from "react";
import type { NavigationNode } from "../../lib/build-site-navigation";
import { Toaster } from "../../components/toast/toaster";
import Head from "next/head";

interface IMainLayout {
  nav: NavigationNode[];
  children: ReactNode;
}

const MainLayout = ({ nav, children }: IMainLayout): JSX.Element => {
  return (
    <>
      <Head>
        <title>D2C Starter Kit</title>
        <meta
          name="description"
          content="D2C Starter Kit - a store front starter for Elastic Path Commerce Cloud"
        />
      </Head>
      <Toaster />
      <Header nav={nav} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
