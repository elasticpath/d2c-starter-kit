import { Flex, MenuGroup, MenuItem, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { NavigationNode } from "../../../lib/build-site-navigation";
import { Menu } from "@headlessui/react";
import { forwardRef, ReactNode } from "react";
import { clsx } from "clsx";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface INavItemContent {
  item: NavigationNode;
  triggered?: () => void;
}

const menuItemInteractionStyle = "hover:bg-none text-brand-primary";

const MyLink = forwardRef<
  HTMLAnchorElement,
  { children: ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => {
  let { href, children, ...rest }: any = props;
  return (
    <NextLink href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </NextLink>
  );
});

const NavItemContent = ({ item, triggered }: INavItemContent): JSX.Element => {
  const buildStack = (item: NavigationNode) => {
    return (
      <div key={item.id}>
        <p>{item.name}</p>
        {item.children.map((child: NavigationNode) => (
          <div
            key={child.id}
            className={clsx(
              "text-sm text-gray-500 m-1",
              menuItemInteractionStyle
            )}
            onClick={triggered}
          >
            <MyLink href={`/search${child.href}`}>{child.name}</MyLink>
          </div>
        ))}
        <div
          className={clsx(
            "text-sm font-semibold text-gray-500 m-1",
            menuItemInteractionStyle
          )}
          onClick={triggered}
        >
          <NextLink href={`/search${item.href}`} passHref>
            <a>Browse All</a>
          </NextLink>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-solid border-gray-100 pb-2">
        {item.children.map((parent: NavigationNode, index: number) => {
          return <div key={index}>{buildStack(parent)}</div>;
        })}
      </div>
      <NextLink href={`/search${item.href}`} passHref onClick={triggered}>
        <a className="m-4 mb-0 text-sm font-semibold">
          <span className="flex flex-row items-center hover:text-brand-primary items-center">
            Browse All {item.name}
            <ArrowRightIcon className="ml-1 w-3 h-3" />
          </span>
        </a>
      </NextLink>
    </div>
  );
};

export default NavItemContent;
