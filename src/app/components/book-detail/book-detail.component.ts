import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  updateForm: FormGroup;
  getId: any;

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
      name: [''],
      price: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onUpdate(): any {
    this.crudservice.updateBook(this.getId, this.updateForm.value).then(
      () => {


          
          // this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
