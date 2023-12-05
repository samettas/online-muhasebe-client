import { Injectable } from '@angular/core';

declare const $:any;
declare const toastr:any;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }

  toast(type: ToastrType, message: string, title: string ) {
    switch (type) {
      case ToastrType.Succes:
        toastr.success(title, message);
        break;
      case ToastrType.Info:
          toastr.info(title, message);
        break;
      case ToastrType.Warning:
        toastr.warning(title, message);
        break;
      case ToastrType.Error:
        toastr.error(title, message);
        break;
    
      default:
        break;
    }
  }
}

export enum ToastrType{
  Succes,
  Error,
  Info,
  Warning
}