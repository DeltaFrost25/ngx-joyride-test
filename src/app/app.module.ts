import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { AlbunCardsComponent } from './albun-cards/albun-cards.component';
import { FooterComponent } from './footer/footer.component';
import { JoyrideModule } from 'ngx-joyride';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OverlayComponent } from './overlay/overlay.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionTitleComponent,
    AlbunCardsComponent,
    FooterComponent,
    OverlayComponent,
  ],
  imports: [
    JoyrideModule.forRoot(),
    RouterModule.forRoot([]),
    BrowserModule,
    NgbModule,
    NgbCarouselModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
