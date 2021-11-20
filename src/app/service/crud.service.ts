import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

export class Book {
  _id!: String;
  name!: String;
  price!: String;
  description!: String;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  //Node Express API

  REST_API: string = 'http://localhost:8000/api';

  //HTTO Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private httpClient: HttpClient,
    private ngZone: NgZone,
    private router: Router
  ) {}

  // Add Method
  dataAdd: any = {};
  async AddBook(data: Book) {
    let API_URL = `${this.REST_API}/add-book`;

    this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError))
      .toPromise()
      .then((res) => {
        console.log(res);
        this.dataAdd = res;
        if (this.dataAdd.success) {
          Swal.fire('Success !', 'Book have been added !', 'success').then(
            (res) => {
              this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
            }
          );
        } else {
          Swal.fire('Error !', 'Input field should not empty !', 'error');
        }
      })          .catch((err) => {
        console.log('add book Error :', err);
      });

  }

  // Get all objects Method
  GetBook() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get Single objects Method

  GetBookById(id: Book): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  dataUpdate: any = {};

  // Update
  async updateBook(id: any, data: any) {
    let API_URL = `${this.REST_API}/update-book/${id}`;

    await Swal.fire({
      title: data.name,
      text: 'Do you want to Update ?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Update',
      denyButtonText: `Don't Update`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpClient
          .put(API_URL, data, { headers: this.httpHeaders })
          .toPromise()
          .then((res) => {
            this.dataUpdate = res;
            console.log(this.dataUpdate);

            if (this.dataUpdate.success) {
              Swal.fire('Saved!', this.dataUpdate.message, 'success');

              this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
            } else {
              Swal.fire('Cancel!', this.dataUpdate.message, 'error');
            }
          })
          .catch((err) => {
            console.log('update book Error :', err);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  // Delete

  dataDelete: any = {};

  async deleteBook(id: any) {
    let API_URL = `${this.REST_API}/delete-book/${id}`;

    await Swal.fire({
      title: 'Are you sure?',
      text: 'You Really want to Delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.httpClient
            .delete(API_URL, { headers: this.httpHeaders })
            .subscribe((res) => {
              this.dataDelete = res;
            });

          window.location.reload();

          Swal.fire('Deleted!', this.dataDelete.message, 'success');
        }
      })
      .catch((err) => {
        console.log('delete book Error :', err);
      });
  }

  //Error

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Handle Client Error
      errorMessage = err.message;
    } else {
      //Handle Server error
      errorMessage = `Error Code ${err.status}\nMessage:${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
