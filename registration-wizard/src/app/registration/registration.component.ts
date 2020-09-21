import { Component, AfterViewChecked, ChangeDetectorRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { AppState } from "./../app.state";
import * as UserDataActions from "../core/userData.actions";
import { UserService } from "../services/user.services";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { UserData } from "../core/userData.model";

interface Food {
  value: string;
  viewValue: string;
}
interface Animal {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements AfterViewChecked {
  show = false;

  userDetails: FormGroup;
  userDetailsFavorites: FormGroup;
  registration: FormGroup;

  foods: Food[] = [
    { value: "Steak", viewValue: "Steak" },
    { value: "Pizza", viewValue: "Pizza" },
    { value: "Tacos", viewValue: "Tacos" },
  ];
  animals: Animal[] = [
    { value: "Cat", viewValue: "Cat" },
    { value: "Dog", viewValue: "Dog" },
    { value: "Chinchilla", viewValue: "Chinchilla" },
  ];
  country: string[] = ["Israel", "USA", "Canada"];
  city: string[] = ["Tel Aviv", "Moscow", "Toronto"];

  myControlCountry = new FormControl();
  myControlCity = new FormControl();

  countries: Observable<string[]>;
  cities: Observable<string[]>;

  //error messages
  account_validation_messages = {
    name: [
      { type: "required", message: "Name is required" },
      {
        type: "minlength",
        message: "Name must be at least 2 characters long",
      },
      { type: "pattern", message: "Name must contain only letters" },
    ],
    age: [
      { type: "required", message: "Age is required" },
      {
        type: "pattern",
        message: "Age must contain only diggets between 1 and 120",
      },
    ],
    dateOfBirth: [{ type: "required", message: "Date of Birth is required" }],
    food: [{ type: "required", message: "Favorite Food is required" }],
    animal: [{ type: "required", message: "Favorite Animal is required" }],
    animal_name: [{ type: "required", message: "Pets name is required" }],

    username: [
      { type: "required", message: "Username is required" },
      {
        type: "minlength",
        message: "Username must be at least 5 characters long",
      },
      {
        type: "pattern",
        message: "Insert correct age between 1 and 120",
      },
    ],
    password: [
      { type: "required", message: "Password is required" },
      {
        type: "minlength",
        message: "Password must be at least 8 characters long",
      },
      {
        type: "pattern",
        message:
          "Password can contain only letters, digits or symbols like !@#%^&*()~",
      },
    ],
  };

  constructor(
    private cdRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    //form builders for the regestration steps
    //step1
    this.userDetails = this._formBuilder.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
          Validators.pattern("^[a-zA-Z]+$"),
        ]),
      ],

      age: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
          Validators.pattern("^[1-9][0-9]?$|^120$"),
        ]),
      ],
      dateOfBirth: [""],
      country: [""],
      city: [""],
    });
    //step2
    this.userDetailsFavorites = this._formBuilder.group({
      food: [""],
      animal: [""],
      animal_name: [""],
    });
    //step3
    this.registration = this._formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("^[0-9A-Za-z]+$"),
        ]),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern("^[0-9A-Za-z!@#%^&*()~]+$"),
        ]),
      ],
    });

    //country autocomplete
    this.countries = this.myControlCountry.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value, this.country))
    );
    //city autocomplete
    this.cities = this.myControlCity.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value, this.city))
    );
  }

  //solution for ngIf - Expression has changed after it was checked. the error exists in developer mode
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  //filter data for the autocomplete
  private _filter(value: string, searchParam): string[] {
    const filterValue = value.toLowerCase();
    return searchParam.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  //get validation error messages for the form fields
  getValidationErrors(formGr: string, filed: any) {
    let validations: any[] = this.account_validation_messages[filed];
    if (!validations || validations.length < 1) {
      return [];
    }
    var errors: any[] = [];
    let formPart;
    if (formGr == "userDetails") {
      formPart = this.userDetails;
    } else if (formGr == "userDetailsFavorites") {
      formPart = this.userDetailsFavorites;
    } else {
      formPart = this.registration;
    }
    validations.forEach((v) => {
      if (
        formPart.get(filed).hasError(v.type) &&
        (formPart.get(filed).dirty || formPart.get(filed).touched)
      ) {
        errors.push(v);
      }
    });
    return errors;
  }

  //store user's data in store and create new user(send data to the server)
  onRegister(
    userDetails: FormGroup,
    userDetailsFavorites: FormGroup,
    registration: FormGroup
  ) {
    let user: UserData = {
      name: userDetails.value.name,
      age: userDetails.value.age,
      dateOfBirth: userDetails.value.dateOfBirth,
      country: userDetails.value.country,
      city: userDetails.value.city,
      food: userDetailsFavorites.value.food,
      animal: userDetailsFavorites.value.animal,
      animal_name: userDetailsFavorites.value.animal_name,
      username: registration.value.username,
      password: registration.value.password,
    };

    //create new user(send data to the server)
    this.userService.create(user).then((res) => {
      this.store.dispatch(new UserDataActions.CreateForm(user)); //store data in store management
      this.router.navigateByUrl("/welcome");
    });
  }
}
