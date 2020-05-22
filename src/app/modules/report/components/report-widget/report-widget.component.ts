import { Component, OnInit, forwardRef, ViewChildren, QueryList, AfterViewInit, ContentChildren, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  IDamDataModel,
  DamWidgetComponent,
  selectIsAdmin,
  ConfirmDialogComponent,
  RxjsStoreHelperService,
  MessageType,
  LoadPayloadData
} from 'ngx-dam-framework';
import { Observable, of } from 'rxjs';
import { IReport, IReportSectionResult } from '../../model/report.model';
import { selectReport, selectReportIsViewOnly } from '../../store/core.selectors';
import { ITocNode } from '../report-toc/report-toc.component';
import { map, concatMap, flatMap, take } from 'rxjs/operators';
import { ReportService } from '../../services/report.service';

export const REPORT_WIDGET = 'REPORT_WIDGET';


@Component({
  selector: 'app-report-widget',
  templateUrl: './report-widget.component.html',
  styleUrls: ['./report-widget.component.scss'],
  providers: [
    { provide: DamWidgetComponent, useExisting: forwardRef(() => ReportWidgetComponent) },
  ],
})
export class ReportWidgetComponent extends DamWidgetComponent implements OnInit, AfterViewInit {

  report$: Observable<IReport>;
  isAdmin$: Observable<boolean>;
  nodes$: Observable<ITocNode[]>;
  isViewOnly$: Observable<boolean>;

  constructor(
    store: Store<IDamDataModel>,
    dialog: MatDialog,
    private helper: RxjsStoreHelperService,
    private reportService: ReportService
  ) {
    super(REPORT_WIDGET, store, dialog);
    this.report$ = this.store.select(selectReport);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.isViewOnly$ = this.store.select(selectReportIsViewOnly);
    this.nodes$ = this.report$.pipe(
      map((report) => {
        return this.makeTocNode(report.sections);
      }),
    );
  }

  publish() {
    this.store.select(selectReport).pipe(
      take(1),
      flatMap((report) => {
        return this.dialog.open(ConfirmDialogComponent, {
          data: {
            action: 'Publish Report',
            question: 'Are you sure you want to publish report ' + report.name + ',<br> this will make it globally available for all users of the facility ?',
          },
        }).afterClosed().pipe(
          concatMap((answer) => {
            if (answer) {
              return this.helper.getMessageAndHandle<IReport>(
                this.store,
                () => {
                  return this.reportService.publish(report.id);
                },
                (message) => {
                  return message.status === MessageType.SUCCESS ? [new LoadPayloadData(message.data)] : [];
                }
              );
            }
            return of();
          }),
        );
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
  }

  makeTocNode(sections: IReportSectionResult[]): ITocNode[] {
    if (!sections) {
      return [];
    }

    return sections.map((s) => {
      return {
        id: s.id,
        header: s.header,
        path: s.path,
        warning: s.thresholdViolation,
        children: this.makeTocNode(s.children),
      };
    });
  }

  ngOnInit(): void {
  }

}
