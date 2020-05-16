import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDetectionMap, ICvxCode, IDetectionResource, ICvxResource } from '../model/public.model';
import { map } from 'rxjs/operators';
import { EntityType } from '../model/entity.model';
import { IFieldInputOptions, IFieldInputData } from '../components/field-input/field-input.component';
import { AgeGroupService } from './age-group.service';

@Injectable({
  providedIn: 'root'
})
export class SupportDataService {

  readonly PUBLIC = '/public/';

  constructor(private http: HttpClient, private ageGroupService: AgeGroupService) { }

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

  getPatientTables(): Observable<string[]> {
    return this.http.get<string[]>(this.PUBLIC + 'codesets/patient');
  }

  getVaccinationTables(): Observable<string[]> {
    return this.http.get<string[]>(this.PUBLIC + 'codesets/vaccination');
  }

  getFieldOptions(data: IFieldInputData): IFieldInputOptions {
    const standardTransform = (elm) => {
      return {
        label: elm,
        value: elm,
      };
    };

    return {
      detectionOptions: data.detections.map((elm) => {
        return {
          label: elm.id + ' - ' + elm.description,
          value: elm.id,
        };
      }),
      cvxOptions: data.cvxs.map((elm) => {
        return {
          label: elm.id + ' - ' + elm.name,
          value: elm.id,
        };
      }),
      ageGroupOptions: [
        ...data.ageGroups.map((elm, i) => {
          return {
            label: this.ageGroupService.getAgeGroupLabel(elm),
            value: 'g' + i,
          };
        }),
        {
          label: this.ageGroupService.getBracketLabel(this.ageGroupService.openBracket(data.ageGroups)) + ' -> + infinity',
          value: 'g' + data.ageGroups.length,
        }
      ],
      vaccinationTableOptions: data.tables.patientTables.map(standardTransform),
      patientTableOptions: data.tables.patientTables.map(standardTransform),
      eventOptions: [{
        label: 'Administered',
        value: '00'
      }, {
        label: 'Historical',
        value: '01'
      }],
    };
  }

}
