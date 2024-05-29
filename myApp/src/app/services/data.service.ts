import { Injectable } from '@angular/core';               // Importing Injectable decorator
import { HttpClient } from '@angular/common/http';        // Importing HttpClient for making HTTP requests
import { Observable } from 'rxjs';                        // Importing Observable for handling asynchronous data

@Injectable({
  providedIn: 'root'                                      // Making the service available application-wide
})
export class DataService {
  private apiUrl = 'http://localhost:3000/data';          // Defining the URL of the backend endpoint

  constructor(private http: HttpClient) {}                // Injecting HttpClient into the service

  // Method to fetch data from the backend
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);               // Making a GET request and returning the Observable
  }
}
