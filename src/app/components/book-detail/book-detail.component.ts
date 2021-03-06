import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  updateForm: FormGroup;
  getId: any;
  submitted = false; 

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private crudservice: CrudService,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudservice.GetBookById(this.getId).subscribe((res) => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description'],
      });
    });

    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }

  onUpdate(): any {
    this.crudservice.updateBook(this.getId, this.updateForm.value)
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    
  }
}
