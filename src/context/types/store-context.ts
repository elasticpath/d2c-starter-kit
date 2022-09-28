import { StoreContext } from "../../lib/types/store-context";
import { ReactNode } from "react";

export interface StoreProviderProps {
  storeContext?: StoreContext;
  children: ReactNode;
}
