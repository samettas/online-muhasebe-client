import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { UcafModel } from '../models/ucaf.model';
import { LoginResponseModel } from '../../auth/models/login-response.model';
import { CryptoService } from 'src/app/common/services/crypto.service';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UcafService {

  loginResponse: LoginResponseModel = new LoginResponseModel();

  constructor(
    private _crypto: CryptoService,
    private _http: GenericHttpService
  ) {
    let loginResponseString = _crypto.decrypto(localStorage.getItem("accessToken").toString())
    this.loginResponse = JSON.parse(loginResponseString);
  }

  getAll(callBack: (res:ResponseModel<UcafModel[]>)=> void) {
    let model = {companyId: this.loginResponse.company.companyId};
    this._http.post<ResponseModel<UcafModel[]>>("UCAFs/GetAllUCAF", model ,res=> callBack(res));
  }
}
