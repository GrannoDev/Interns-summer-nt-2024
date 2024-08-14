import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { take } from 'rxjs'
import { User } from '../../shared/model/user.model'

@Injectable({
  providedIn: null,
})
export class SignalsService {
  #url = 'https://jsonplaceholder.typicode.com'
  #http = inject(HttpClient)

  #users = signal<User[]>([])
  users = this.#users.asReadonly()
  constructor() {}

  loadUsers = () => {
    this.#http
      .get<User[]>(`${this.#url}/users`)
      .pipe(take(1))
      .subscribe((users) => this.#users.set(users))
  }
}
