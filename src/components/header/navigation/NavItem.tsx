import { theme } from "@chakra-ui/react";
import type { NavigationNode } from "../../../lib/build-site-navigation";
import { globalBaseWidth, styles } from "../../../styles/theme";
import { Menu, Popover, Transition } from "@headlessui/react";

import NavItemContent from "./NavItemContent";
import { clsx } from "clsx";
import { Fragment } from "react";

interface INavItem {
  item: NavigationNode;
}

const NavItem = ({ item }: INavItem): JSX.Element => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              "mr-8",
              open ? "text-brand-primary" : "text-gray-800"
            )}
          >
            {item.name}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute mt-6 z-popover bg-white min-w-[14rem]w-full max-w-global p-4 shadow-xl">
              <NavItemContent item={item} />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default NavItem;
