import { UserData } from "./userData.model";
import { Action } from "@ngrx/store";

//defining types of actions
export const CREATE_FORM = "[User Data] CREATE_FORM";

//create user with form data
export class CreateForm implements Action {
  readonly type = CREATE_FORM;
  constructor(public payload: UserData) {}
}

export type Actions = CreateForm;
