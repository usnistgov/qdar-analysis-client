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
import { IDetectionResource } from '../../shared/model/public.model';

@Injectable()
export class CoreEffects {

  @Effect()
  loadFiles$ = this.actions$.pipe(
    ofType(CoreActionTypes.LoadADFiles),
    concatMap((action: LoadADFiles) => {
      return this.fileService.getList().pipe(
        flatMap((files) => {
          return [
            new LoadResourcesInRepository<IADFDescriptor>({
              collections: [{
                key: 'files',
                values: files,
              }]
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
    private helper: RxjsStoreHelperService,
    private messageService: MessageService,
    private supportService: SupportDataService,
    private actions$: Actions<CoreActions>
  ) { }

}
