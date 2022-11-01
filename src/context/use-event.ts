import { useContext } from "react";
import { EventContext } from "./event-provider";

/**
 * Should be used to access the event stream and subscribe to events in the store.
 */
export function useEvent() {
  const context = useContext(EventContext);

  if (context === undefined) {
    throw new Error("useEvent must be used within a EventProvider");
  }

  const { events$ } = context;

  return {
    events: events$.asObservable(),
  };
}
