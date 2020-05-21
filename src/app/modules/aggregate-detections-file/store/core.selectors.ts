import { createEntityAdapter, Dictionary } from '@ngrx/entity';
import { IADFDescriptor, IADFMetadata } from '../model/adf.model';
import { selectFromCollection, selectValue } from 'ngx-dam-framework';
import { createSelector } from '@ngrx/store';
import { IAnalysisJob } from '../../report/model/report.model';

const filesAdapter = createEntityAdapter<IADFDescriptor>();
const filesSelectors = filesAdapter.getSelectors();
export const selectFilesRepo = selectFromCollection('files');
export const selectFilesEntities = createSelector(
  selectFilesRepo,
  filesSelectors.selectEntities,
);
export const selectFiles = createSelector(
  selectFilesRepo,
  filesSelectors.selectAll,
);
export const selectFilesById = createSelector(
  selectFilesEntities,
  byId<IADFDescriptor>(),
);

const jobsAdapter = createEntityAdapter<IAnalysisJob>();
const jobsSelectors = jobsAdapter.getSelectors();
export const selectJobsRepo = selectFromCollection('jobs');
export const selectJobsEntities = createSelector(
  selectJobsRepo,
  jobsSelectors.selectEntities,
);
export const selectJobs = createSelector(
  selectJobsRepo,
  jobsSelectors.selectAll,
);
export const selectJobsById = createSelector(
  selectJobsEntities,
  byId<IAnalysisJob>(),
);


export const selectOpenFileMetadata = selectValue<IADFMetadata>('file');
function byId<T>() {
  return (dict: Dictionary<T>, props: any): T => {
    if (dict[props.id]) {
      return dict[props.id];
    } else {
      return undefined;
    }
  };
}
