import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserService} from "../service/user.service";

@Injectable()
export class UserNameValidator implements AsyncValidator {

  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const trimedValue = (<string>control.value).trim();
    return this.userService.searchUser(trimedValue)
      .pipe(
        map(users => users.filter(el => el.login === trimedValue).length ? {name: {value: trimedValue}} : null)
      )
  }
}
