import {Injectable} from "@angular/core";
import {FilterService} from "../../service/filter.service";
import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {CREATE_FILTER, createFilterAction, createFilterSuccessAction} from "../actions/filter.actions";
import {map, mergeMap} from "rxjs/operators";

@Injectable()
export class FilterEpic {

  constructor (private filterService: FilterService) {}

  createFilter$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType<ReturnType<typeof createFilterAction>>(CREATE_FILTER).pipe(
      mergeMap(({payload}) => {
        return this.filterService
          .createFilter(payload.filter)
          .pipe(
            map(filter => createFilterSuccessAction(filter))
          )
      })
    )
  }
}

