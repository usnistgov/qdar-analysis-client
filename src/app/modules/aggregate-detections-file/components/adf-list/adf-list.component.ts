import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IADFDescriptor } from '../../model/adf.model';
import { Observable, combineLatest, of } from 'rxjs';
import { map, concatMap, flatMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectFiles } from '../../store/core.selectors';
import { RxjsStoreHelperService, DeleteResourcesFromCollection, MessageType, ConfirmDialogComponent } from 'ngx-dam-framework';
import { FileService } from '../../services/file.service';
import { MatDialog } from '@angular/material/dialog';
import { AdfJobDialogComponent } from '../adf-job-dialog/adf-job-dialog.component';
import { AnalysisService } from '../../../shared/services/analysis.service';
import { QueryDialogComponent } from '../../../shared/components/query-dialog/query-dialog.component';
import { selectPatientTables, selectVaccinationTables, selectAllDetections, selectAllCvx } from '../../../shared/store/core.selectors';
import { ValuesService } from '../../../shared/services/values.service';
import { ReportTemplateService } from '../../../report-template/services/report-template.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-adf-list',
  templateUrl: './adf-list.component.html',
  styleUrls: ['./adf-list.component.scss']
})
export class AdfListComponent implements OnInit {

  files$: Observable<IADFDescriptor[]>;

  constructor(
    private store: Store<any>,
    private helper: RxjsStoreHelperService,
    private analysisService: AnalysisService,
    private rt: ReportTemplateService,
    private valueService: ValuesService,
    private dialog: MatDialog,
    private fileService: FileService,
  ) {
    this.files$ = this.store.select(selectFiles).pipe(
      map((list) => {
        return [
          ...list.map((value) => {
            return { ...value };
          }),
        ];
      }),
    );
  }

  query(fileId: string) {
    combineLatest([
      this.fileService.getFileMetadata(fileId),
      this.store.select(selectAllDetections),
      this.store.select(selectAllCvx),
      this.store.select(selectPatientTables),
      this.store.select(selectVaccinationTables),
    ]).pipe(
      map(([file, detections, cvxCodes, patientTables, vaccinationTables]) => {
        return this.valueService.getFieldOptions({
          detections: detections.filter((d) => file.configuration.detections.includes(d.id)),
          ageGroups: file.configuration.ageGroups,
          cvxs: cvxCodes,
          tables: {
            vaccinationTables,
            patientTables,
          }
        });
      }),
    ).pipe(
      take(1),
      flatMap((options) => {
        return this.dialog.open(QueryDialogComponent, {
          minWidth: '70vw',
          maxWidth: '93vw',
          maxHeight: '95vh',
          data: {
            options,
            query: this.rt.getEmptyDataViewQuery(),
          }
        }).afterClosed().pipe(
          flatMap((data) => {
            if (data) {
              return this.analysisService.executeQuery(fileId, data).pipe(
                map((result) => {
                  this.dialog.open(DataTableComponent, {
                    minWidth: '70vw',
                    maxWidth: '93vw',
                    maxHeight: '95vh',
                    data: {
                      labelizer: this.valueService.getQueryValuesLabel(options),
                      table: result,
                    }
                  });
                  return result;
                }),
              );
            }
            return of();
          }),
        );
      }),
    ).subscribe();
  }

  analyse(id: string) {
    this.fileService.templatesForFile(id).pipe(
      flatMap((templates) => {
        return this.dialog.open(AdfJobDialogComponent, {
          data: {
            templates,
          }
        }).afterClosed().pipe(
          map((value) => {
            if (value) {
              console.log(value);
            }
          }),
        );
      }),
    ).subscribe();
  }



  remove(meta: IADFDescriptor) {
    this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          action: 'Delete ADF',
          question: 'Are you sure you want to delete file ' + meta.name + ' ? ',
        }
      }
    ).afterClosed().pipe(
      concatMap((answer) => {
        if (answer) {
          return this.helper.getMessageAndHandle(
            this.store,
            () => {
              return this.fileService.deleteFile(meta.id);
            },
            (message) => {
              return [
                ...message.status === MessageType.SUCCESS ? [new DeleteResourcesFromCollection({
                  key: 'files',
                  values: [meta.id],
                })] : [],
              ];
            }
          );
        }
      }),
    ).subscribe();
  }

  age(date: Date) {
    return moment(date).fromNow();
  }

  ngOnInit(): void {
  }

}
