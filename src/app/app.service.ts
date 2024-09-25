import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  validate(value: string, minLength: number) {
     return new Observable((subscriber) => {
      setTimeout(() => {
        if( value.length > minLength) {
          subscriber.next(true)
      }else { 
          subscriber.next(false)
      }
      subscriber.complete();
      }, 1_000)
     })
  }
}
