import { Injectable } from '@angular/core';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { RequestModel } from 'src/app/common/models/request.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseService } from 'src/app/common/services/login-response.service';
import { BookEntryModel } from '../models/book-entry.model';

@Injectable({
  providedIn: 'root'
})
export class BookEntryService {

  constructor(
    private _http: GenericHttpService,
    private _loginResponse: LoginResponseService
  ) { }

  getAll(model: RequestModel, callBack: (res: PaginationResultModel<BookEntryModel[]>)=> void) {
    this._http.post<PaginationResultModel<BookEntryModel[]>>("BookEntriesGetAllBookEntry", model, res=> {
      callBack(res);
    });
  }
}
