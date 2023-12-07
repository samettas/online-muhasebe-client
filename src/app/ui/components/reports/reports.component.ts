import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { NavModel } from 'src/app/common/components/blank/models/navs.model';
import { ReportModel } from './models/report.model';
import { ReportService } from './services/report.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule,BlankComponent,SectionComponent],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  navs: NavModel[] = [
    {
      routerLink: '/',
      class: '',
      name: 'Ana Sayfa',
    },
    {
      routerLink: '/reports',
      class: 'active',
      name: 'Raporlar',
    },
  ];

  reports: ReportModel[] = []

  constructor(
    private _report: ReportService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._report.getAll(res=> this.reports = res);
  }

  changeSpanClassByStatus(status: boolean) {
    if(status)
      return "text-succes";
    return "text-danger";
  }
}
