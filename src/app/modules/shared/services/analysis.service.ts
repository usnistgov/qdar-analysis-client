import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDataViewQuery } from '../../report-template/model/report-template.model';
import { Observable } from 'rxjs';
import { IDataTable } from '../../report-template/model/report.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  readonly PUBLIC = 'api/analyze/';

  constructor(private http: HttpClient) { }

  executeQuery(target: string, query: IDataViewQuery): Observable<IDataTable> {
    return this.http.post<IDataTable>(this.PUBLIC + 'query/' + target, query);
  }

}
