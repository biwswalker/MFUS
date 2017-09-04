import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Primeface
import { PanelMenuModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { TriStateCheckboxModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';

// Component
import { HeaderComponent } from './content/header/header.component';
import { FooterComponent } from './content/footer/footer.component';
import { SidebarComponent } from './content/menu/sidebar/sidebar.component';
import { NavbarComponent } from './content/menu/navbar/navbar.component';
import { PagesComponent } from './content/pages/pages.component';
import { HomeComponent } from './content/pages/home/home.component';
import { InputTextComponent } from './content/pages/tag/input-text/input-text.component';
import { CalendarComponent } from './content/pages/tag/calendar/calendar.component';

//Service
import { UtilsService } from './services/utils.service';
import { AuthenticationService } from './services/authentication.service';

//Router
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'pages', component: PagesComponent, children: [
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    PagesComponent,
    HomeComponent,
    InputTextComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    InputTextModule,
    AutoCompleteModule,
    PanelMenuModule,
    CalendarModule,
    RadioButtonModule,
    TriStateCheckboxModule,
    DropdownModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    PanelModule
  ],
  providers: [
    AuthenticationService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
