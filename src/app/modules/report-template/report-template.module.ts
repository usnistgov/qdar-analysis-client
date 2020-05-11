import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTemplateRoutingModule } from './report-template-routing.module';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './store/core.effects';


@NgModule({
  declarations: [TemplatesListComponent],
  imports: [
    CommonModule,
    ReportTemplateRoutingModule,
    SharedModule,
    EffectsModule.forFeature([CoreEffects]),
  ]
})
export class ReportTemplateModule { }
