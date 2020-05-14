import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgeGroupsComponent } from './components/age-groups/age-groups.component';
import { AgeBracketComponent } from './components/age-bracket/age-bracket.component';
import { DetectionsListComponent } from './components/detections-list/detections-list.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DetectionsPickerComponent } from './components/detections-picker/detections-picker.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './store/core.effects';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { DamMessagesModule } from 'ngx-dam-framework';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadFieldComponent } from './components/file-upload-field/file-upload-field.component';
import { FileDropDirective } from './directives/file-drop.directive';
import { DescriptorDisplayComponent } from './components/descriptor-display/configuration-display.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeModule } from 'angular-tree-component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AgeGroupsComponent,
    AgeBracketComponent,
    DetectionsListComponent,
    DetectionsPickerComponent,
    FileUploadFieldComponent,
    FileDropDirective,
    DescriptorDisplayComponent
  ],
  imports: [
    CommonModule,
    StoreModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    ContextMenuModule,
    EffectsModule.forFeature([CoreEffects]),
    EditorModule,
    CalendarModule,
    DamMessagesModule,
    DropdownModule,
    NgbModule,
    TreeModule,
    MatDialogModule,
  ],
  exports: [
    // Modules,
    StoreModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    ContextMenuModule,
    EditorModule,
    CalendarModule,
    DamMessagesModule,
    DropdownModule,
    NgbModule,
    TreeModule,
    MatDialogModule,

    // Components,
    AgeGroupsComponent,
    DetectionsListComponent,
    DetectionsPickerComponent,
    FileUploadFieldComponent,
    FileDropDirective,
    DescriptorDisplayComponent,
  ]
})
export class SharedModule { }
