import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'ngx-dam-framework';
import { IReport } from '../model/report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  readonly URL_PREFIX = '/api/report/';

  constructor(private http: HttpClient) { }

  getById(id: string): Observable<IReport> {
    return this.http.get<IReport>(this.URL_PREFIX + id);
  }

  save(report: IReport): Observable<Message<IReport>> {
    return this.http.post<Message<IReport>>(this.URL_PREFIX, report);
  }

}
