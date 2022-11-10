import { createContext, ReactNode, useEffect, useReducer } from "react";
import {
  buildSiteNavigation,
  NavigationNode,
} from "../lib/build-site-navigation";

interface NavReducerAction {
  type: "build-site-navigation";
  payload: { nav: NavigationNode[] };
}

interface NavState {
  nav: NavigationNode[];
}

export function navReducer(
  state: NavState,
  action: NavReducerAction
): NavState {
  switch (action.type) {
    case "build-site-navigation": {
      return action.payload;
    }
    default:
      return state;
  }
}

export const NavContext = createContext<
  { state: NavState; dispatch: (action: NavReducerAction) => void } | undefined
>(undefined);

interface NavProviderProps {
  children: ReactNode;
}

export function NavProvider({ children }: NavProviderProps) {
  const [state, dispatch] = useReducer(navReducer, { nav: [] });

  useEffect(() => {
    const getNavItems = async () => {
      const nav = await buildSiteNavigation();
      dispatch({
        type: "build-site-navigation",
        payload: { nav },
      });
    };
    getNavItems();
  }, []);

  return (
    <NavContext.Provider value={{ state, dispatch }}>
      {children}
    </NavContext.Provider>
  );
}
