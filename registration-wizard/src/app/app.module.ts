import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./core/userData.reducer";
import {
  MatStepperModule,
  MatNativeDateModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatAutocompleteModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WelcomeComponent } from "./welcome/welcome.component";
import { RegistrationComponent } from "./registration/registration.component";

@NgModule({
  declarations: [AppComponent, WelcomeComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ userData: reducer }),
    //forms
    FormsModule,
    ReactiveFormsModule,
    //angular material
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatAutocompleteModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
