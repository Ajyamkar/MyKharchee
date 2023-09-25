import { useState } from "react";
import { IntermediateStateType } from "../Types";

/**
 * Custome hook to manage intermediate states such isfetching, isSaving etc.
 */
const useIntermediateStates = () => {
  const [intermediateState, setIntermediateState] =
    useState<IntermediateStateType>({} as IntermediateStateType);

  return { intermediateState, setIntermediateState };
};

export default useIntermediateStates;
