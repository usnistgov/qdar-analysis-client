import { createSelector } from '@ngrx/store';
import { selectPayloadData } from 'ngx-dam-framework';
import { IReport } from '../model/report.model';

export const selectReport = createSelector(
  selectPayloadData,
  (payload: IReport) => {
    return payload;
  }
);
