import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  Books: any = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetBook().subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  }

  delete(id: any, i: any) {

      this.crudService.deleteBook(id)
    
  }
}
