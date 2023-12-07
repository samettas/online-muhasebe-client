import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/common/models/response.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { ReportModel } from '../models/report.model';
import { LoginResponseService } from 'src/app/common/services/login-response.service';
import { RequestModel } from 'src/app/common/models/request.model';
import { ReportRequestModel } from 'src/app/common/models/report-request.model';
import { MessageResponseModel } from 'src/app/common/models/message-response.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private _http: GenericHttpService,
    private _loginResponse: LoginResponseService
  ) { }

  getAll(callBack: (res: ReportModel[])=> void) {
    let model: RequestModel = new RequestModel();
    model.companyId = this._loginResponse.getLoginResponseModel().company.companyId;
    this._http.post<ResponseModel<ReportModel[]>>("Reports/GetAll", model, res=> {
      callBack(res.data);
    });
  }

  request(model: ReportRequestModel, callBack: (res:MessageResponseModel)=> void) {
    model.companyId = this._loginResponse.getLoginResponseModel().company.companyId;
    this._http.post<MessageResponseModel>("Reports/Request", model, res=> {
      callBack(res);
    })
  }
}
