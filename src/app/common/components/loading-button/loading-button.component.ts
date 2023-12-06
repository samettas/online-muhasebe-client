import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent {
  isloading: boolean = false;
  @Input() form: NgForm;
  @Input() btnName: string = "";
  @Input() btnLoadingDescription: string = "";
  @Input() btnClass: string = "btn-outline-primary w-100";
  @Input() btnLoadingClass = "btn-outline-primary w-100";
  @Input() iconClass: string = "fa fa-save";

  constructor(
    private _store: Store<{loading: boolean}>
  ){
      this._store.select("loading").subscribe(res=> {
        this.isloading = res;
      });
  }
}
