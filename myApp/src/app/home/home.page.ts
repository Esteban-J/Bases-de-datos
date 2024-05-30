import { Component, OnInit } from '@angular/core';        // Importing Component and OnInit from Angular core
import { DataService } from '../services/data.service';   // Importing the DataService
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',                                   // Defining the component selector
  templateUrl: 'home.page.html',                          // Defining the HTML template
  styleUrls: ['home.page.scss'],                          // Defining the styles
})
// export class HomePage implements OnInit {
//   data: any[] = [];                                       // Defining a property to hold the fetched data
export class HomePage {
  //constructor(private dataService: DataService) {}        // Injecting DataService into the component
  //constructor(private http: HttpClient) {}  
  //ngOnInit() {
    //Fetching data when the component is initialized
    //this.dataService.getData().subscribe((data) => {
     //this.data = data;                                   // Assigning the fetched data to the property
    //});
    // this.http.get('http://localhost:3000/data')
    // .subscribe(res => {
    //   console.log(res)
    // })
     
  //}

  constructor(private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
  }
}

