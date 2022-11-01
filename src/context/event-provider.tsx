import { createContext, ReactNode } from "react";
import { BehaviorSubject } from "rxjs";
import { StoreEvent } from "./types/event-types";

export const EventContext = createContext<{
  events$: BehaviorSubject<StoreEvent>;
}>({ events$: new BehaviorSubject<StoreEvent>({ type: "init" }) });

interface EventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  const $initializedEventBus = new BehaviorSubject<StoreEvent>({
    type: "init",
  });

  return (
    <EventContext.Provider value={{ events$: $initializedEventBus }}>
      {children}
    </EventContext.Provider>
  );
}
