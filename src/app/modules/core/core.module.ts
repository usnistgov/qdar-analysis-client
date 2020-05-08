import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DamAuthenticationModule, DamMessagesModule } from 'ngx-dam-framework';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent, ErrorPageComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    DamAuthenticationModule,
    DamMessagesModule,
    CardModule,
  ],
  exports: [HeaderComponent, FooterComponent, HomeComponent, ErrorPageComponent],
})
export class CoreModule { }
