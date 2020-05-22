import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'ngx-dam-framework';
import { IReport, IReportDescriptor } from '../model/report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  readonly URL_PREFIX = '/api/report/';

  constructor(private http: HttpClient) { }

  publish(id: string): Observable<Message<IReport>> {
    return this.http.post<Message<IReport>>(this.URL_PREFIX + 'publish/' + id, {});
  }

  published(): Observable<IReportDescriptor[]> {
    return this.http.post<IReportDescriptor[]>(this.URL_PREFIX + 'published', {});
  }

  publishedForFacility(facility: string): Observable<IReportDescriptor[]> {
    return this.http.post<IReportDescriptor[]>(this.URL_PREFIX + 'published/' + facility, {});
  }

  delete(id: string): Observable<Message<IReport>> {
    return this.http.delete<Message<IReport>>(this.URL_PREFIX + id);
  }


  getById(id: string): Observable<IReport> {
    return this.http.get<IReport>(this.URL_PREFIX + id);
  }

  save(report: IReport): Observable<Message<IReport>> {
    return this.http.post<Message<IReport>>(this.URL_PREFIX, report);
  }

}
