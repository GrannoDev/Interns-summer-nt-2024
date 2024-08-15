import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../../shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  #url = 'https://jsonplaceholder.typicode.com';
  #http = inject(HttpClient);

  #users = signal<User[]>([]);
  users = this.#users.asReadonly();

  loadUsers = () => {
    this.#http
      .get<User[]>(`${this.#url}/users`)
      .pipe(take(1))
      .subscribe((users) => this.#users.set(users));
  };

  addUser = (user: User) => {
    this.#users.update((prev) => [...prev, user]);
  };
  deleteUser = (id: number) => {
    this.#users.update((prev) => [...prev.filter((user) => user.id !== id)]);
  };

  getUserById = (id: number) => {
    return this.users().find((user) => user.id === id);
  };
}
