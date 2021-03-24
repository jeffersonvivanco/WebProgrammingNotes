import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-my-http',
  templateUrl: './my-http.component.html',
  styleUrls: ['./my-http.component.css']
})
export class MyHttpComponent implements OnInit {
  serverMessage;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/api/hello')
      .pipe(catchError(this.handleError))
      .subscribe(data => this.serverMessage = data);
    // error example, /api/bye is 404
    this.http.get('/api/bye')
      .pipe(catchError(this.handleError))
      .subscribe(data => this.serverMessage = data);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // a client-side or network error occurred. Handle it accordingly
      console.error('An error occurred: ', error.error.message);
    } else {
      // the backend returned an unsuccessful response code
      // the response body may contain clues as to what went wrong
      console.error(
        `Backend returned code: ${error.status}
        Body was: ${error.error}
      `);
    }
    // return an observable with a user-facing error message
    alert('Something bad happened, please try again later');
    return throwError('Something bad happened, please try again later');
  }

}
