import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'ngx-dam-framework';
import { IADFDescriptor, IADFMetadata } from '../model/adf.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  readonly URL_PREFIX = '/api/adf/';

  constructor(private http: HttpClient) { }

  getList(): Observable<IADFDescriptor[]> {
    return this.http.get<IADFDescriptor[]>(this.URL_PREFIX);
  }

  deleteFile(id: string): Observable<Message<IADFMetadata>> {
    return this.http.delete<Message<IADFMetadata>>(this.URL_PREFIX + '/' + id);
  }


  getFileMetadata(id: string): Observable<IADFMetadata> {
    return this.http.get<IADFMetadata>(this.URL_PREFIX + '/' + id);
  }

  upload(form: FormData): Observable<Message<any>> {
    return this.http.post<Message<any>>(this.URL_PREFIX + 'upload', form);
  }

}
