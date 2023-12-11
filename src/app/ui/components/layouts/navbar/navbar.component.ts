import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { LoginResponseModel } from '../../auth/models/login-response.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() loginResponse: LoginResponseModel = new LoginResponseModel();
  
  constructor(
    private _auth: AuthService
  ){}

  logout() {
    this._auth.logout();
  }

  changeYear() {
    this._auth.changeYear(this.loginResponse);
    window.location.reload();
  }
}
