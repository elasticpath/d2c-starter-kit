import { useContext } from "react";
import { NavContext } from "./nav-provider";

export function useNav() {
  const context = useContext(NavContext);

  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider");
  }

  const { state } = context;

  return { nav: state.nav };
}
