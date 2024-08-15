import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <button type="button" class="btn btn-outline" (click)="addUserDialog.showModal()">Create User</button>

    <dialog #addUserDialog class="rounded-lg bg-base-100 backdrop:backdrop-blur-sm">
      <form [formGroup]="userForm" (ngSubmit)="createUser(); addUserDialog.close()" class="p-4">
        <label class="input input-bordered flex items-center gap-2">
          Name
          <input type="text" class="grow" placeholder="Daisy" formControlName="name" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          Email
          <input type="text" class="grow" placeholder="daisy@site.com" formControlName="email" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          Phone
          <input type="text" class="grow" placeholder="12 34 56 78" formControlName="phone" />
        </label>
        <div class="mt-2 flex w-full justify-end gap-2">
          <button type="button" class="btn btn-outline btn-error" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn btn-outline btn-success" [disabled]="userForm.invalid || !userForm.dirty">
            Add User
          </button>
        </div>
      </form>
    </dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  private readonly fb = inject(FormBuilder);
  onCreateUser = output<User>();
  largestId = input<number>();
  userDialog = viewChild<ElementRef<HTMLDialogElement>>('addUserDialog');
  protected userForm = this.fb.group<{
    name: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
  }>({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    email: new FormControl<string>('', {
      validators: [Validators.email, Validators.required],
      nonNullable: true,
    }),
    phone: new FormControl<string>('', {
      validators: [Validators.pattern('[- +()0-9]{6,}'), Validators.required],
      nonNullable: true,
    }),
  });

  protected cancel = () => {
    this.userForm.reset();
    this.userForm.markAsPristine();
    this.userDialog()?.nativeElement.close();
  };

  protected createUser = () => {
    if (this.userForm.invalid) {
      return;
    }

    const newUser: User = {
      id: (this.largestId() ?? 0) + 1,
      ...this.userForm.getRawValue(),
    };
    this.onCreateUser.emit(newUser);
    this.userForm.reset();
    this.userForm.markAsPristine();
  };
}
