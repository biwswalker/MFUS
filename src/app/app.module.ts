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
import { CheckboxModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';

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
import { AutocompleteComponent } from './content/pages/tag/autocomplete/autocomplete.component';
import { DropdownComponent } from './content/pages/tag/dropdown/dropdown.component';
import { TextareaComponent } from './content/pages/tag/textarea/textarea.component';
import { SliderComponent } from './content/pages/tag/slider/slider.component';
import { CheckboxComponent } from './content/pages/tag/checkbox/checkbox.component';
import { ButtonComponent } from './content/pages/tag/button/button.component';
import { UploadFileComponent } from './content/pages/tag/upload-file/upload-file.component';
import { ExampleComponent } from './content/pages/tag/example/example.component';
import { DatatableNormalComponent } from './content/pages/tag/datatable-normal/datatable-normal.component';

//Router
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'example', component: ExampleComponent },
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
    AutocompleteComponent,
    DropdownComponent,
    TextareaComponent,
    SliderComponent,
    CheckboxComponent,
    ButtonComponent,
    UploadFileComponent,
    ExampleComponent,
    DatatableNormalComponent,
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
    CheckboxModule,
    DropdownModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    InputTextareaModule,
    SliderModule
  ],
  providers: [
    AuthenticationService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
