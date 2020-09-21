import { UserData } from "./../core/userData.model";
import * as UserDataActions from "./userData.actions";

export function reducer(
  state: UserData[] = [],
  action: UserDataActions.Actions
) {
  switch (action.type) {
    case UserDataActions.CREATE_FORM:
      return [...state, action.payload];

    default:
      return state;
  }
}
