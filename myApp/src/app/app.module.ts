import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';   // Importing BrowserModule for browser support
import { RouteReuseStrategy } from '@angular/router';        // Importing RouteReuseStrategy for routing
import { HttpClientModule } from '@angular/common/http';     // Importing HttpClientModule for making HTTP requests

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';  // Importing IonicModule and Ionic routing strategy
import { AppComponent } from './app.component';              // Importing the root component
import { AppRoutingModule } from './app-routing.module';     // Importing the app routing module

@NgModule({
  declarations: [AppComponent],          // Declaring the root component
  //entryComponents: [],                   // Entry components (none in this case)
  imports: [
    BrowserModule,
    IonicModule.forRoot(),               // Initializing IonicModule
    AppRoutingModule,
    HttpClientModule                     // Including HttpClientModule to make HTTP requests
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }  // Providing the Ionic routing strategy
  ],
  bootstrap: [AppComponent],             // Bootstrapping the root component
})
export class AppModule {}
