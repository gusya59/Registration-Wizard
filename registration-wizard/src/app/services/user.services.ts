import { Injectable } from "@angular/core";
import axios from "axios";
import { UserData } from "../core/userData.model";

//in order to avoid blocked by CORS error
const proxyurl = "https://cors-anywhere.herokuapp.com/";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  //sent user form data to the server
  create(userData: UserData) {
    return axios({
      method: "post",
      url: proxyurl + "https://example.com/", //demo url. will always send a successful responce
      data: userData,
    })
      .then((res) => {
        console.log("success with status: " + res.status);
        res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
