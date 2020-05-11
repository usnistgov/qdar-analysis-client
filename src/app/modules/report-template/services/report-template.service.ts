import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'ngx-dam-framework';
import { EntityType } from '../../shared/model/entity.model';
import { IReportTemplateDescriptor, IReportTemplate } from '../model/report-template.model';
import { IDescriptor } from '../../shared/model/descriptor.model';

@Injectable({
  providedIn: 'root'
})
export class ReportTemplateService {

  readonly URL_PREFIX = '/api/template/';

  constructor(private http: HttpClient) { }

  // getEmptyConfiguration(): IDigestConfiguration {
  //   return {
  //     id: undefined,
  //     name: '',
  //     owner: undefined,
  //     lastUpdated: undefined,
  //     locked: false,
  //     owned: true,
  //     published: false,
  //     payload: {
  //       ageGroups: [],
  //       detections: [],
  //     },
  //     description: '',
  //     type: EntityType.CONFIGURATION,
  //     viewOnly: undefined,
  //   };
  // }

  getReportTemplates(): Observable<IReportTemplateDescriptor[]> {
    return this.http.get<IReportTemplateDescriptor[]>(this.URL_PREFIX);
  }

  getById(id: string): Observable<IReportTemplate> {
    return this.http.get<IReportTemplate>(this.URL_PREFIX + id);
  }

  save(template: IReportTemplate): Observable<Message<IReportTemplate>> {
    return this.http.post<Message<IReportTemplate>>(this.URL_PREFIX, template);
  }

  delete(id: string): Observable<Message<IReportTemplate>> {
    return this.http.delete<Message<IReportTemplate>>(this.URL_PREFIX + id);
  }

  // lock = (id: string): Observable<Message<IDigestConfiguration>> => {
  //   return this.http.post<Message<IDigestConfiguration>>(this.URL_PREFIX + id + '/lock/true', {});
  // }

  // unlock = (id: string): Observable<Message<IDigestConfiguration>> => {
  //   return this.http.post<Message<IDigestConfiguration>>(this.URL_PREFIX + id + '/lock/false', {});
  // }

  publish = (id: string): Observable<Message<IReportTemplate>> => {
    return this.http.post<Message<IReportTemplate>>(this.URL_PREFIX + id + '/publish', {});
  }

  clone(id: string): Observable<Message<IReportTemplate>> {
    return this.http.post<Message<IReportTemplate>>(this.URL_PREFIX + id + '/clone', {});
  }

  getDescriptor(configuration: IReportTemplate, owned: boolean): IDescriptor {
    return {
      id: configuration.id,
      type: EntityType.TEMPLATE,
      name: configuration.name,
      owner: configuration.owner,
      lastUpdated: configuration.lastUpdated,
      viewOnly: configuration.viewOnly,
      locked: configuration.locked,
      published: configuration.published,
      owned,
    };
  }

}
