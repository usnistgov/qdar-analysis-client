import { createEntityAdapter, Dictionary } from '@ngrx/entity';
import { IADFDescriptor, IADFMetadata } from '../model/adf.model';
import { selectFromCollection, selectValue } from 'ngx-dam-framework';
import { createSelector } from '@ngrx/store';

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
  (dict: Dictionary<IADFDescriptor>, props: any): IADFDescriptor => {
    if (dict[props.id]) {
      return dict[props.id];
    } else {
      return undefined;
    }
  }
);
export const selectOpenFileMetadata = selectValue<IADFMetadata>('file');
