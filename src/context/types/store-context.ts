import { StoreContext } from "../../lib/types/store-context";
import { ReactNode } from "react";

export type ProviderProps = {
  storeContext?: StoreContext;
  children: ReactNode;
};

export interface StoreProviderProps {
  storeContext?: StoreContext;
  children: ReactNode;
}
