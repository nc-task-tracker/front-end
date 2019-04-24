import {User} from "./user.model";
import {Token} from "./token.model";

export interface UserTokenModel {
  readonly user: User;
  readonly token: Token;
}
