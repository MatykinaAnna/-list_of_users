import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import {Observable, Subscriber} from 'rxjs';
import { map } from 'rxjs/operators';


export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company
}

interface Company {
  name: string,
  catchPhrase: string,
  bs: string
}

interface Address{
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: number,
    lng: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  load(): Observable<any>{
    return this.http.get(this.url)
  }
  load_user(id:number){
    this.http.get(this.url).subscribe(date=>{
      console.log(date)
    })
  }
}
