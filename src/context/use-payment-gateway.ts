import { useCallback, useContext } from "react";
import { PGRContext } from "./payment-gateway-provider";
import {
  PGRAction,
  PGRState,
  ResolvePaymentFunction,
  SupportedGateway,
} from "./types/payment-gateway-reducer-types";

export function usePaymentGateway() {
  const context = useContext(PGRContext);

  if (context === undefined) {
    throw new Error("usePaymentGateway must be used within a PGRProvider");
  }

  const { state, dispatch } = context;

  // TODO This is possibly not working as intended
  const callbackGateway = useCallback(_registerGateway(dispatch, state), [
    context,
  ]);

  return {
    registerGateway: callbackGateway,
    state,
  };
}

function _registerGateway(
  dispatch: (action: PGRAction) => void,
  state: PGRState
) {
  return (
    resolvePayment: ResolvePaymentFunction,
    type: SupportedGateway
  ): void => {
    if (
      state.kind === "registered-payment-gateway-register-state" &&
      state.type === type
    ) {
      return;
    }

    dispatch({
      type: "update-payment-gateway-register",
      payload: { type, resolvePayment },
    });
  };
}
