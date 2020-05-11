import { selectFromCollection } from 'ngx-dam-framework';
import { createEntityAdapter, Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { IReportTemplateDescriptor } from '../model/report-template.model';

const reportTemplatesAdapter = createEntityAdapter<IReportTemplateDescriptor>();
const reportTemplatesSelectors = reportTemplatesAdapter.getSelectors();
export const selectReportTemplatesRepo = selectFromCollection('templates');
export const selectReportTemplatesEntities = createSelector(
  selectReportTemplatesRepo,
  reportTemplatesSelectors.selectEntities,
);
export const selectReportTemplates = createSelector(
  selectReportTemplatesRepo,
  reportTemplatesSelectors.selectAll,
);
export const selectConfigurationById = createSelector(
  selectReportTemplatesEntities,
  (dict: Dictionary<IReportTemplateDescriptor>, props: any): IReportTemplateDescriptor => {
    if (dict[props.id]) {
      return dict[props.id];
    } else {
      return undefined;
    }
  }
);
