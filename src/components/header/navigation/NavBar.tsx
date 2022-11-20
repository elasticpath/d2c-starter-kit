import type { NavigationNode } from "../../../lib/build-site-navigation";

import NavItem from "./NavItem";

interface INavBar {
  nav: NavigationNode[];
}

const NavBar = ({ nav }: INavBar): JSX.Element => {
  return (
    <nav className="grid grid-flow-col auto-cols-max">
      {nav &&
        nav.map((item: NavigationNode) => (
          <NavItem key={item.id} item={item} />
        ))}
    </nav>
  );
};

export default NavBar;
