import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ITask} from './task';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = '/tasks';
  private count;
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) {
    let dataArray = [];
    this.http.get<ITask[]>(this.url).subscribe(data => dataArray = data,
        error => this.errorHandler(error),
      () => this.count = dataArray[dataArray.length - 1].id || 0);
  }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url).pipe(
      catchError(this.errorHandler)
    );
  }

  addTask(task: ITask): Observable<ITask>{
    this.count += 1;
    task.id = this.count;
    return this.http.post<ITask>(this.url, task, this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        );
  }

  updateTask(task: ITask): Observable<ITask>{
    return this.http.put<ITask>(this.url.concat('/', String(task.id)), task, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  removeTask(task: ITask): Observable<ITask>{
    return this.http.delete<ITask>(this.url.concat('/', String(task.id)), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
