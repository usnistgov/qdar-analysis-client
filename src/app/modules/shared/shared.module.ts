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

@NgModule({
  declarations: [AgeGroupsComponent, AgeBracketComponent, DetectionsListComponent, DetectionsPickerComponent],
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

    // Components,
    AgeGroupsComponent,
    DetectionsListComponent,
    DetectionsPickerComponent,
  ]
})
export class SharedModule { }
