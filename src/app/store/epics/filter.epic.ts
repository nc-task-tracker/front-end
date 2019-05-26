import {Injectable} from "@angular/core";
import {FilterService} from "../../service/filter.service";
import {ActionsObservable} from "redux-observable";
import {AnyAction} from "redux";
import {
  CREATE_FILTER,
  createFilterAction,
  createFilterSuccessAction,
  DELETE_FILTER, deleteFilterSuccessAction, FETCH_FILTER, fetchFilterFailedAction, fetchFilterSuccessAction,
  SELECT_FILTER, selectFilterSuccess
} from "../actions/filter.actions";
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {TransformService} from "../../utils/transform.service";
import {defaultFilter} from "../../models/filter-item.model";
import {selectFilterById} from "../selectors/filter.selector";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../index";

@Injectable()
export class FilterEpic {
  private ngRedux: NgRedux<AppState>;

  constructor (private filterService: FilterService) {}

  createFilter$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(CREATE_FILTER).pipe(
      mergeMap(({payload}) => {
        return this.filterService
          .createFilter(payload.filter)
          .pipe(
            map(filter => {
              console.log('CREATE FILTER', filter);
              createFilterSuccessAction(filter)})
          )
      })
    )
  }

  fetchFilter$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_FILTER).pipe(
      switchMap(({}) => {
        return this.filterService
          .getFilters()
          .pipe(
            map( filters => fetchFilterSuccessAction(TransformService.transformToMap(filters))),
            catchError(error => of(fetchFilterFailedAction(error.message)))
          );
      })
    );
  };

  deleteFilter$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(DELETE_FILTER).pipe(
      mergeMap(({payload}) => {
        return this.filterService.deleteFilter(payload.filterId)
          .pipe(
            map( () => deleteFilterSuccessAction(payload.filterId))
          );
      })
    );
  };

  selectFilter$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SELECT_FILTER).pipe(
      switchMap(({payload}) => {
        if (payload.filterId) {
          const storedFilter = selectFilterById(this.ngRedux.getState(), payload.filterById);
            if(!storedFilter) {
              return this.filterService
                .getFilter(payload.filterId)
                .pipe(
                  map(filter => selectFilterSuccess(filter))
                );
            }else return of(selectFilterSuccess(storedFilter));
        } else {
           return of(selectFilterSuccess(defaultFilter));
        }
      })
    );
  }
}

