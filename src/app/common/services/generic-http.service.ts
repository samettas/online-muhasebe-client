import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { LoginResponseModel } from 'src/app/ui/components/auth/models/login-response.model';
import { LoginResponseService } from './login-response.service';
import jwt_decode from 'jwt-decode';
import { CryptoService } from './crypto.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  apiUrl: string = 'https://localhost:7213/api/';
  refreshTokenApiUrl: string = "Auth/GetTokenByRefreshToken";
  token: string = "";
  loginResponse: LoginResponseModel = new LoginResponseModel();
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _crypto: CryptoService,
    private _loginResponse: LoginResponseService,
    private _router: Router
  ) {}

  get<T>(
    api: string,
    callBack: (res: T) => void,
    authorize: boolean = true,
    diffApi: boolean = false
  ) {
    this.getToken();
    this._http
      .get<T>(`${this.setApi(diffApi, api)}`, this.setOptions(authorize))
      .subscribe({
        next: (res) => callBack(res),
        error: (err: HttpErrorResponse) => this._error.errorHandler(err),
      });
  }

  post<T>(
    api: string,
    model: any,
    callBack: (res: T) => void,
    authorize: boolean = true,
    diffApi: boolean = false
  ) {
    this.getToken();
    this._http
      .post<T>(
        `${this.setApi(diffApi, api)}`,
        model,
        this.setOptions(authorize)
      )
      .subscribe({
        next: (res) => callBack(res),
        error: (err: HttpErrorResponse) => this._error.errorHandler(err),
      });
  }

  setApi(diffApi: boolean, api: string) {
    if (diffApi) return api;
    return this.apiUrl + api;
  }

  setOptions(authorize: boolean) {
    if (authorize)
      return { headers: { Authorization: `Bearer ${this.token}` } };
    return {};
  }

  getToken() {
    this.loginResponse = this._loginResponse.getLoginResponseModel();
    this.token = this.loginResponse.token.token;
    if (this.token != '' && this.token != undefined && this.token != null) {
      var decoded: any = jwt_decode(this.token);
      let time = new Date().getTime() / 1000;
      let refreshToken =
        new Date(this.loginResponse.token.refreshTokenExpires).getTime() / 1000;
      if (time > decoded.exp) {
        if (refreshToken >= time) {
          let model: {
            userId: string;
            refreshToken: string;
            companyId: string;
          } = {
            userId: this.loginResponse.userId,
            refreshToken: this.loginResponse.token.refreshToken,
            companyId: this.loginResponse.company.companyId,
          };

            this._http.post<LoginResponseModel>(this.apiUrl + this.refreshTokenApiUrl ,model).subscribe({
              next: (res) =>{
                let cryptoValue = this._crypto.encrypto(JSON.stringify(res));
                localStorage.setItem("accessToken", cryptoValue);
                this.loginResponse = res;
                this.token = this.loginResponse.token.token;
              },
              error:(err)=>{
                this._error.errorHandler(err);
                console.log(err);
              }
            });
        } else {
          localStorage.removeItem("accessToken");
          this._router.navigateByUrl("/login");
        }
      }
      console.log(decoded);
    }
  }
}
