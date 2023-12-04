import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

bootstrapApplication(AppComponent,{
  providers : [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot([
        {
          path: "",
          loadComponent: ()=> import("./app/ui/components/layouts/layouts.component").then(c=> c.LayoutsComponent),
          children: [
            {
              path: "",
              loadComponent: ()=> import("./app/ui/components/blank/blank.component").then(c=> c.BlankComponent)
            }
          ]
        }
      ])
    )
  ]
})