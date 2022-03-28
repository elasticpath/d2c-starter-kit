import Footer from "../../components/Footer/Footer";
import MainMenu from "../../components/MainMenu/MainMenu";

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
