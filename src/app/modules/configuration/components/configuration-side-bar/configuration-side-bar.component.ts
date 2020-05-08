import { Component, OnInit, Input } from '@angular/core';
import { IConfigurationDescriptor, IDigestConfiguration } from '../../model/configuration.model';
import { ConfigurationService } from '../../services/configuration.service';
import {
  MessageService,
  ConfirmDialogComponent,
  Message,
  MessageType,
  DeleteResourcesFromRepository,
  TurnOffLoader,
  TurnOnLoader,
  InsertResourcesInCollection,
  EditorUpdate,
} from 'ngx-dam-framework';
import { MatDialog } from '@angular/material/dialog';
import { flatMap, concatMap, tap, catchError, toArray } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { GoToEntity } from '../../../shared/store/core.actions';
import { EntityType } from 'src/app/modules/shared/model/entity.model';
import { DamWidgetComponent } from 'ngx-dam-framework';

@Component({
  selector: 'app-configuration-side-bar',
  templateUrl: './configuration-side-bar.component.html',
  styleUrls: ['./configuration-side-bar.component.scss']
})
export class ConfigurationSideBarComponent implements OnInit {

  @Input()
  set configurations(c: IConfigurationDescriptor[]) {
    this.pConfigurations = c;
    this.filter(this.filterText);
  }

  get configurations() {
    return this.pConfigurations;
  }

  pConfigurations: IConfigurationDescriptor[];
  filtered: IConfigurationDescriptor[];
  filterText = '';

  constructor(
    public widget: DamWidgetComponent,
    private configurationService: ConfigurationService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private store: Store<any>,
  ) {

  }

  filter(text) {
    this.filterText = text;
    this.filtered = this.configurations.filter((conf) => {
      return conf.name.includes(text);
    });
  }

  executeContextMenuAction(
    call: (configuration: IConfigurationDescriptor) => Observable<Message<IDigestConfiguration>>,
    handler: (message: Message<IDigestConfiguration>) => Action[],
    configuration: IConfigurationDescriptor,
  ): Observable<Action> {
    this.store.dispatch(new TurnOnLoader({
      blockUI: true,
    }));

    return call(configuration).pipe(
      flatMap((message) => {
        return [
          ...handler(message),
          this.messageService.messageToAction(message),
        ];
      }),
      catchError((error) => {
        return of(this.messageService.actionFromError(error));
      }),
      toArray(),
      flatMap((actions) => {
        return [
          ...actions,
          new TurnOffLoader(),
        ];
      }),
      tap((action) => this.store.dispatch(action)),
    );
  }

  // tslint:disable-next-line: cognitive-complexity
  deleteConfiguration(configuration: IConfigurationDescriptor, active: boolean) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        action: 'Delete Configuration',
        question: 'Are you sure you want to delete configuration ' + configuration.name + ' ? <br>' +
          (configuration.published || configuration.locked ? '<ul>' : '') +
          (configuration.published ? '<li> this configuration is published and might be used by other users </li>' : '') +
          (configuration.locked ? '<li> this configuration is locked </li>' : '') +
          (configuration.published || configuration.locked ? '<ul>' : ''),
      }
    }).afterClosed().pipe(
      concatMap((answer) => {
        if (answer) {
          return this.executeContextMenuAction(
            (conf) => {
              return this.configurationService.delete(conf.id);
            },
            (message) => {
              return message.status === MessageType.SUCCESS ? [new DeleteResourcesFromRepository({
                collections: [{
                  key: 'configurations',
                  values: [configuration.id],
                }],
              }),
              ...(active ? [
                new GoToEntity({
                  type: EntityType.CONFIGURATION,
                }),
              ] : [])
              ] : [];
            },
            configuration,
          );
        }
        return of();
      }),
    ).subscribe();
  }

  readonly addAndOpenHandler = (message) => {
    return message.status === MessageType.SUCCESS ? [new InsertResourcesInCollection({
      key: 'configurations',
      values: [
        this.configurationService.getDescriptor(message.data, true),
      ],
    }),
    new GoToEntity({
      type: EntityType.CONFIGURATION,
      id: message.data.id,
    })] : [];
  }

  cloneConfiguration(configuration: IConfigurationDescriptor) {
    return this.executeContextMenuAction(
      (conf) => {
        return this.configurationService.clone(conf.id);
      },
      this.addAndOpenHandler,
      configuration,
    ).subscribe();
  }

  createConfiguration() {
    return this.executeContextMenuAction(
      (conf) => {
        return this.configurationService.save(this.configurationService.getEmptyConfiguration());
      },
      this.addAndOpenHandler,
      undefined,
    ).subscribe();
  }


  ngOnInit(): void {
  }

}
