import { createEntityAdapter, Dictionary } from '@ngrx/entity';
import { IDetectionResource } from '../model/public.model';
import { selectFromCollection } from 'ngx-dam-framework';
import { createSelector } from '@ngrx/store';

const detectionsAdapter = createEntityAdapter<IDetectionResource>();
const detectionsSelectors = detectionsAdapter.getSelectors();
export const selectDetectionsRepo = selectFromCollection('detections');
export const selectDetectionsEntities = createSelector(
  selectDetectionsRepo,
  detectionsSelectors.selectEntities,
);
export const selectAllDetections = createSelector(
  selectDetectionsRepo,
  detectionsSelectors.selectAll,
);
export const selectDetectionById = createSelector(
  selectDetectionsEntities,
  (dict: Dictionary<IDetectionResource>, props: any): IDetectionResource => {
    if (dict[props.id]) {
      return dict[props.id];
    } else {
      return undefined;
    }
  }
);
