
export interface ParameterValue {
  readonly id: string;
  readonly parameterValueName: string;
}

export const defaultFilter: ParameterValue = {
  id: null,
  parameterValueName: null
};
