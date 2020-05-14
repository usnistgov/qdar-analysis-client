import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IADFMetadata, IExtractPercent } from '../../model/adf.model';
import { Store } from '@ngrx/store';
import { selectOpenFileMetadata } from '../../store/core.selectors';
import { AgeGroupService } from '../../../shared/services/age-group.service';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { selectDetectionById } from '../../../shared/store/core.selectors';
import { IDetectionResource } from '../../../shared/model/public.model';

@Component({
  selector: 'app-adf-summary',
  templateUrl: './adf-summary.component.html',
  styleUrls: ['./adf-summary.component.scss']
})
export class AdfSummaryComponent implements OnInit {

  adfMeta$: Observable<IADFMetadata>;
  extractItems$: Observable<{
    [P in keyof IExtractPercent]?: IExtractPercent[P];
  } & { label: string }[]>;
  detections$: Observable<IDetectionResource[]>;

  constructor(
    private store: Store<any>,
    public agService: AgeGroupService) {
    this.adfMeta$ = this.store.select(selectOpenFileMetadata);
    this.extractItems$ = this.store.select(selectOpenFileMetadata).pipe(
      map((meta) => {
        return Object.keys(meta.summary.extract).map((key) => {
          return {
            label: key,
            ...meta.summary.extract[key],
          };
        });
      }),
    );
    this.detections$ = this.store.select(selectOpenFileMetadata).pipe(
      switchMap((meta) => {
        return combineLatest(meta.configuration.detections.map((detection) => {
          return this.store.select(selectDetectionById, { id: detection });
        }));
      }),
    );
  }

  ngOnInit(): void {
  }

}
