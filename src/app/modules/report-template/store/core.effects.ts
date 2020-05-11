import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoreActionTypes, CoreActions, LoadReportTemplates, LoadReportTemplatesFailure, LoadReportTemplatesSuccess } from './core.actions';
import { IReportTemplateDescriptor } from '../model/report-template.model';
import { LoadResourcesInRepository, MessageService } from 'ngx-dam-framework';
import { ReportTemplateService } from '../services/report-template.service';

@Injectable()
export class CoreEffects {

  @Effect()
  loadCores$ = this.actions$.pipe(
    ofType(CoreActionTypes.LoadReportTemplates),
    concatMap((action: LoadReportTemplates) => {
      return this.reportTemplateService.getReportTemplates().pipe(
        flatMap((templates) => {
          return [
            new LoadResourcesInRepository<IReportTemplateDescriptor>({
              collections: [{
                key: 'templates',
                values: templates,
              }]
            }),
            new LoadReportTemplatesSuccess(templates),
          ];
        }),
        catchError((error) => {
          return of(
            this.messageService.actionFromError(error),
            new LoadReportTemplatesFailure(error)
          );
        })
      );
    })
  );



  constructor(
    private actions$: Actions<CoreActions>,
    private reportTemplateService: ReportTemplateService,
    private messageService: MessageService,
  ) { }

}
