import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { LogModel } from './models/log.model';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { LogService } from './services/log.service';
import { LogRequestModel } from './models/log-request.model';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, BlankComponent, SectionComponent],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

result: PaginationResultModel<LogModel[]> = new PaginationResultModel<LogModel[]>;

request: LogRequestModel = new LogRequestModel();

pageNumbers: number[] = [];

constructor(
  private _log: LogService
){
  this.request.tableName = "UniformChartOfAccount";
  this.request.pageNumber = 1;
  this.request.pageSize = 5;
}
  ngOnInit(): void {
    this.getLogsByTableName();
  }

getLogsByTableName(pageNumber: number = 1) {
  this.request.pageNumber = pageNumber;
  this._log.getAllByTableName(this.request, res=> {
    this.result = res.data;

    this.result.datas.forEach(element=>{
      let model = JSON.parse(element.data);
      element.dataObject = model;
    });

    console.log(this.result);

    this.pageNumbers = [];
    for (let i = 0; i < res.data.totalPages; i++) {
      this.pageNumbers.push(i+1);
    }
  });
}

changeLogProgressName(progress: string)
{
  if(progress == "Delete")
    return "Silme"
  else if(progress == "UpdateOld")
    return "Güncelleme Eski"
  else if(progress == "UpdateNew")
    return "Güncelleme Yeni"
  else if(progress == "Create")
    return "Yeni Kayıt"

    return ""
}

}
