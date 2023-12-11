import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { NavModel } from 'src/app/common/components/blank/models/navs.model';
import { ExcelLoadingButtonComponent } from 'src/app/common/components/excel-loading-button/excel-loading-button.component';
import { FormsModule } from '@angular/forms';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { BookEntryModel } from './models/book-entry.model';
import { BookEntryService } from './services/book-entry.service';
import { RequestModel } from 'src/app/common/models/request.model';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  selector: 'app-book-entries',
  standalone: true,
  imports: [CommonModule, BlankComponent, SectionComponent, ExcelLoadingButtonComponent, FormsModule, TrCurrencyPipe],
  templateUrl: './book-entries.component.html',
  styleUrls: ['./book-entries.component.css']
})
export class BookEntriesComponent implements OnInit {
  navs: NavModel[] = [
    {
      routerLink: '/',
      class: '',
      name: 'Ana Sayfa',
    },
    {
      routerLink: '/book-entries',
      class: 'active',
      name: 'Yevmiye Fişleri',
    },
  ];
  filterText: string = "";
  pageNumber: number = 1;
  pageSize: number = 5;
  pageNumbers: number[] = [];
  result: PaginationResultModel<BookEntryModel[]> = new PaginationResultModel<BookEntryModel[]>();

  constructor(
    private _bookEntry: BookEntryService
  ){}

  ngOnInit(): void {

  }

  getAll(pageNumber: number = 1) {
    this.pageNumber = pageNumber;
    let model: RequestModel = new RequestModel();
    model.pageNumber = this.pageNumber;
    model.pageSize = this.pageSize;
    
    this._bookEntry.getAll(model, res=> {
      this.result = res;
      this.pageNumbers = [];
      for (let i = 0; i < res.totalPages; i++) {
        this.pageNumbers.push(i+1);
      }
    });
  }

  exportExcel() {

  }

}
