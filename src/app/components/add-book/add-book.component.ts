import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';

type SystemTerms = {
  en: string;
  [key: string]: string;
};

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.bookForm.controls;
  }

  ngOnInit(): void {}

  onSubmit(): any {
    this.crudService.AddBook(this.bookForm.value);
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }
  }
}
