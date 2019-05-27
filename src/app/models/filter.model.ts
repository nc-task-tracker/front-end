import {ParameterValue} from "./paramentValue.model";


export interface Filter {
  readonly id: string;
  readonly filterName: string;
  readonly parameterValues: ParameterValue[];
}

export const defaultFilter: Filter = {
  id: null,
  filterName: '',
  parameterValues: null
};
