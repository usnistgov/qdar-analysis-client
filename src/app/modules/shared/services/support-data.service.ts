import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDetectionMap, ICvxCode, IDetectionResource, ICvxResource } from '../model/public.model';
import { map } from 'rxjs/operators';
import { EntityType } from '../model/entity.model';

@Injectable({
  providedIn: 'root'
})
export class SupportDataService {

  readonly PUBLIC = '/public/';

  constructor(private http: HttpClient) { }

  getDetections(): Observable<IDetectionResource[]> {
    return this.http.get<IDetectionMap>(this.PUBLIC + 'detections').pipe(
      map((detectionsMap) => {
        return Object.keys(detectionsMap).map((code) => {
          return {
            id: code,
            type: EntityType.DETECTION,
            description: detectionsMap[code].description,
            target: detectionsMap[code].target,
          };
        });
      }),
    );
  }

  getCvxCodes(): Observable<ICvxResource[]> {
    return this.http.get<ICvxCode[]>(this.PUBLIC + 'cvx').pipe(
      map((codes: ICvxCode[]) => {
        return codes.map((code) => {
          return {
            id: code.cvx,
            type: EntityType.CVX,
            ...code,
          };
        });
      }),
    );
  }

}
