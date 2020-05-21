import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, flatMap } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import {
  CoreActionTypes,
  CoreActions,
  LoadADFiles,
  LoadADFilesSuccess,
  LoadADFilesFailure,
  LoadADFile,
  LoadADFileSuccess,
  LoadADFileFailure,
} from './core.actions';
import { FileService } from '../services/file.service';
import { MessageService, LoadResourcesInRepository, SetValue, RxjsStoreHelperService } from 'ngx-dam-framework';
import { IADFDescriptor } from '../model/adf.model';
import { Store } from '@ngrx/store';
import { ConfigurationService } from '../../configuration/services/configuration.service';
import { IConfigurationDescriptor } from '../../configuration/model/configuration.model';
import { SupportDataService } from '../../shared/services/support-data.service';
import { IDetectionResource, ICvxResource } from '../../shared/model/public.model';
import { AnalysisService } from '../../shared/services/analysis.service';
import { IAnalysisJob } from '../../report/model/report.model';

type Resources = IDetectionResource | ICvxResource | IADFDescriptor | IAnalysisJob;

@Injectable()
export class CoreEffects {

  @Effect()
  loadFiles$ = this.actions$.pipe(
    ofType(CoreActionTypes.LoadADFiles),
    concatMap((action: LoadADFiles) => {
      return combineLatest([
        this.fileService.getList(),
        this.supportService.getCvxCodes(),
        this.supportService.getDetections(),
        this.supportService.getPatientTables(),
        this.supportService.getVaccinationTables(),
        this.analysisService.getJobs(),
      ]).pipe(
        flatMap(([files, cvx, detections, patientTables, vaccinationTables, jobs]) => {
          return [
            new SetValue({
              patientTables,
              vaccinationTables,
            }),
            new LoadResourcesInRepository<Resources>({
              collections: [
                {
                  key: 'files',
                  values: files,
                }, {
                  key: 'detections',
                  values: detections,
                },
                {
                  key: 'cvx',
                  values: cvx,
                },
                {
                  key: 'jobs',
                  values: jobs,
                }
              ]
            }),
            new LoadADFilesSuccess(files),
          ];
        }),
        catchError((error) => {
          return of(
            this.messageService.actionFromError(error),
            new LoadADFilesFailure(error)
          );
        })
      );
    })
  );

  @Effect()
  loadFile$ = this.actions$.pipe(
    ofType(CoreActionTypes.LoadADFile),
    concatMap((action: LoadADFile) => {
      return combineLatest([
        this.fileService.getFileMetadata(action.id),
        this.supportService.getDetections(),
      ]).pipe(
        flatMap(([file, detections]) => {
          return [
            new LoadResourcesInRepository<IDetectionResource>({
              collections: [{
                key: 'detections',
                values: detections,

              }]
            }),
            new SetValue({
              file,
            }),
            new LoadADFileSuccess(file),
          ];
        }),
        catchError((error) => {
          return of(
            this.messageService.actionFromError(error),
            new LoadADFileFailure(error)
          );
        })
      );
    })
  );


  constructor(
    private fileService: FileService,
    private store: Store<any>,
    private analysisService: AnalysisService,
    private helper: RxjsStoreHelperService,
    private messageService: MessageService,
    private supportService: SupportDataService,
    private actions$: Actions<CoreActions>
  ) { }

}
