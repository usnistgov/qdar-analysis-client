import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportWidgetComponent } from './components/report-widget/report-widget.component';
import { DamFrameworkModule, DamMessagesModule } from 'ngx-dam-framework';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './store/core.effects';
import { ReportEditorComponent } from './components/report-editor/report-editor.component';
import { ReportSectionComponent } from './components/report-section/report-section.component';
import { SharedModule } from '../shared/shared.module';
import { ReportTocComponent } from './components/report-toc/report-toc.component';


@NgModule({
  declarations: [ReportWidgetComponent, ReportEditorComponent, ReportSectionComponent, ReportTocComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    DamFrameworkModule,
    DamMessagesModule,
    EffectsModule.forFeature([CoreEffects]),
  ]
})
export class ReportModule { }
