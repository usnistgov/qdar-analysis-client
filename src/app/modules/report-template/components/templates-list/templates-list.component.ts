import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReportTemplateDescriptor, IReportTemplate } from '../../model/report-template.model';
import { Store } from '@ngrx/store';
import { selectReportTemplates } from '../../store/core.selectors';
import {
  selectIsAdmin,
  RxjsStoreHelperService,
  ConfirmDialogComponent,
  MessageType,
  DeleteResourcesFromRepository,
  InsertResourcesInCollection,
} from 'ngx-dam-framework';
import { MatDialog } from '@angular/material/dialog';
import { concatMap } from 'rxjs/operators';
import { ReportTemplateService } from '../../services/report-template.service';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  templates$: Observable<IReportTemplateDescriptor[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private store: Store<any>,
    private helper: RxjsStoreHelperService,
    private templateService: ReportTemplateService,
    private dialog: MatDialog) {
    this.templates$ = this.store.select(selectReportTemplates);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  remove(template: IReportTemplateDescriptor) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        action: 'Delete Report Template',
        question: 'Are you sure you want to delete template ' + template.name + ' ? <br>' +
          (template.published ? '<ul><li> this configuration is published and might be used by other users </li></ul>' : ''),
      },
    }).afterClosed().pipe(
      concatMap((answer) => {
        if (answer) {
          return this.helper.getMessageAndHandle<IReportTemplateDescriptor>(
            this.store,
            () => {
              return this.templateService.delete(template.id);
            },
            (message) => {
              return message.status === MessageType.SUCCESS ? [new DeleteResourcesFromRepository({
                collections: [{
                  key: 'templates',
                  values: [template.id],
                }],
              })] : [];
            }
          );
        }
        return of();
      }),
    ).subscribe();
  }

  readonly addAndOpenHandler = (message) => {
    return message.status === MessageType.SUCCESS ? [new InsertResourcesInCollection({
      key: 'templates',
      values: [
        this.templateService.getDescriptor(message.data, true),
      ],
    }),
      // new GoToEntity({
      //   type: EntityType.CONFIGURATION,
      //   id: message.data.id,
      // })
    ] : [];
  }

  clone(template: IReportTemplateDescriptor) {
    return this.helper.getMessageAndHandle<IReportTemplate>(
      this.store,
      () => {
        return this.templateService.clone(template.id);
      },
      this.addAndOpenHandler,
    ).subscribe();
  }

  publish(template: IReportTemplateDescriptor) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        action: 'Publish Template',
        question: 'Are you sure you want to publish template ' + template.name + ',<br> this will make it globally available for all users ?',
      },
    }).afterClosed().pipe(
      concatMap((answer) => {
        if (answer) {
          return this.helper.getMessageAndHandle<IReportTemplate>(
            this.store,
            () => {
              return this.templateService.publish(template.id);
            },
            this.addAndOpenHandler,
          );
        }
        return of();
      }),
    ).subscribe();
  }

  ngOnInit(): void {
  }

}
