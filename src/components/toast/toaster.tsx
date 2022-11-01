import { useEvent } from "../../context/use-event";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export function Toaster(): null {
  const { events } = useEvent();
  const toast = useToast();

  useEffect(() => {
    const sub = events.subscribe({
      next: (event) => {
        if (event.type !== "init" && event.action !== "init") {
          toast({
            description: "message" in event ? event.message : undefined,
            status: event.type,
            duration: 2000,
            isClosable: true,
          });
        }
      },
    });
    return () => sub.unsubscribe();
  }, [events, toast]);

  return null;
}
