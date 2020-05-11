import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { IADFDescriptor } from '../../model/adf.model';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectFiles } from '../../store/core.selectors';
import { RxjsStoreHelperService, DeleteResourcesFromCollection, MessageType, ConfirmDialogComponent } from 'ngx-dam-framework';
import { FileService } from '../../services/file.service';
import { MatDialog } from '@angular/material/dialog';

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
