import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserData } from "../core/userData.model";
import { AppState } from "./../app.state";
import { Subscription } from "rxjs";
@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
})
export class WelcomeComponent implements OnInit {
  userData: UserData;

  //get user form data from the store
  constructor(private store: Store<AppState>) {}
  res: Subscription;

  ngOnInit() {
    this.res = this.store.select("userData").subscribe((res) => {
      this.userData = res;
    });
  }
  ngOnDestroy() {
    this.res.unsubscribe();
  }
}
