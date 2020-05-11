import { Action } from '@ngrx/store';
import { IReportTemplateDescriptor } from '../model/report-template.model';

export enum CoreActionTypes {
  LoadReportTemplates = '[Core] Load Report Templates',
  LoadReportTemplatesSuccess = '[Core] Load Report Templates Success',
  LoadReportTemplatesFailure = '[Core] Load Report Templates Failure',
}

export class LoadReportTemplates implements Action {
  readonly type = CoreActionTypes.LoadReportTemplates;
}

export class LoadReportTemplatesSuccess implements Action {
  readonly type = CoreActionTypes.LoadReportTemplatesSuccess;
  constructor(public payload: IReportTemplateDescriptor[]) { }
}

export class LoadReportTemplatesFailure implements Action {
  readonly type = CoreActionTypes.LoadReportTemplatesFailure;
  constructor(public payload: { error: any }) { }
}

export type CoreActions = LoadReportTemplates | LoadReportTemplatesSuccess | LoadReportTemplatesFailure;

