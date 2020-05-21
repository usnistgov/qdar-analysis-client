import { Component, OnInit, forwardRef, ViewChildren, QueryList, AfterViewInit, ContentChildren, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IDamDataModel, DamWidgetComponent } from 'ngx-dam-framework';
import { Observable } from 'rxjs';
import { IReport, IReportSectionResult } from '../../model/report.model';
import { selectReport } from '../../store/core.selectors';
import { ITocNode } from '../report-toc/report-toc.component';
import { map } from 'rxjs/operators';

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
  nodes$: Observable<ITocNode[]>;

  constructor(store: Store<IDamDataModel>, dialog: MatDialog) {
    super(REPORT_WIDGET, store, dialog);
    this.report$ = this.store.select(selectReport);
    this.nodes$ = this.report$.pipe(
      map((report) => {
        return this.makeTocNode(report.sections);
      }),
    );
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
