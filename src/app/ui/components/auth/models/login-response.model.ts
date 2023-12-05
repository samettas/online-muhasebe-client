import { CompanyModel } from "./company.model";
import { TokenModel } from "./token.model";

export class LoginResponseModel{
    token: TokenModel = new TokenModel();
    email: string = "";
    userId: string = "";
    nameLastName: string = "";
    companies: CompanyModel[] = [];
    company: CompanyModel = new CompanyModel();
    year:number = new Date().getFullYear(); 
}