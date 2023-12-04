import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { LoginResponseModel } from '../models/login-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api : string = "https://localhost:7213/api/Auth/Login";
  constructor(
    private _http: GenericHttpService,
    private _router: Router,
  ) { }

  login(model: any){
    this._http.post<LoginResponseModel>(this.api,model, res =>{
      localStorage.setItem("accessToken",JSON.stringify(res));
      this._router.navigateByUrl("/");
    })
  }
}
