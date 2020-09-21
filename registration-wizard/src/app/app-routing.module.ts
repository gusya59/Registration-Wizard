import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { RegistrationComponent } from "./registration/registration.component";

const routes: Routes = [
  {
    path: "",
    component: RegistrationComponent,
  },
  {
    path: "welcome",
    component: WelcomeComponent,
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
