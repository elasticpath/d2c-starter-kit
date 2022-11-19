import { NavigationNode } from "../../lib/build-site-navigation";
import SearchModal from "../search/SearchModal";
import MobileNavBar from "./navigation/MobileNavBar";
import EpIcon from "../../../public/icons/ep-icon.svg";

import NavBar from "./navigation/NavBar";
import Link from "next/link";
import CartMenu from "../cart/CartMenu";
import { clsx } from "clsx";

interface IHeader {
  nav: NavigationNode[];
}

const Header = ({ nav }: IHeader): JSX.Element => {
  return (
    <header
      className={clsx(
        `p-4 sticky top-0 bg-white z-sticky border-b border-gray-200`
      )}
    >
      <div className="items-center w-full justify-between flex md:hidden">
        <MobileNavBar nav={nav} />
      </div>
      <div className="items-center w-full justify-between hidden md:flex">
        <div className="flex-1 min-w-[4rem]">
          <Link href="/">
            <a aria-label="Go to home page">
              <div className="relative min-w-[2.5rem] w-10 h-10">
                <EpIcon />
              </div>
            </a>
          </Link>
        </div>

        <div className="max-w-global w-full">
          <NavBar nav={nav} headerPadding={4} />
        </div>

        <div className="flex gap flex-1 justify-end">
          <SearchModal />
          <CartMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
