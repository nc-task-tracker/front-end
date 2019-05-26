import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {UserService} from "../service/user.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class UserEmailValidator implements AsyncValidator {

  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const trimedValue = (<string>control.value).trim();
    return this.userService.searchUser(null, trimedValue)
      .pipe(
        map(users => users.filter(el => el.email === trimedValue).length ? {name: {value: trimedValue}} : null)
      )
  }
}
