import { CalendarModel } from './content/models/calendar-model';

import { ApplicationTrackingService } from './services/application-tracking.service';
import { LoginComponent } from './content/pages/login/login.component';
import { DocumentsService } from './services/documents.service';
import { AddressService } from './services/address.service';
import { ParentService } from './services/parent.service';
import { DocumentsscreeningComponent } from './content/pages/documentsscreening/documentsscreening.component';
import { EducationLevelService } from './services/educationlevel.service';
import { UploadDocumentComponent } from './content/pages/apply-scholarship/upload-document/upload-document.component';

import { StartupService } from "./services/startup.service";
import { ApplyscholarshipService } from "./services/applyscholarship.service";

import { TitlenameComponent } from "./content/pages/titlename/titlename.component";
import { SchoolComponent } from "./content/pages/school/school.component";
import { MajorComponent } from "./content/pages/major/major.component";
import { NewsComponent } from "./content/pages/news/news.component";
import { ScholarshipannouncementService } from "./services/scholarshipannouncement.service";
import { ScholarshipService } from "./services/scholarship.service";
import { TitleNameService } from "./services/titlename.service";
import { NewsService } from "./services/news.service";
import { SponsorsService } from "./services/sponsors.service";
import { MajorService } from "./services/major.service";
import { SchoolService } from "./services/school.service";
import { RouterModule, Routes } from "@angular/router";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";

// Primeface
import { PanelMenuModule, } from 'primeng/primeng';
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
import { StepsModule } from 'primeng/primeng';
import { GrowlModule, TooltipModule, DialogModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';

// Component
import { HeaderComponent } from "./content/header/header.component";
import { FooterComponent } from "./content/footer/footer.component";
import { SidebarComponent } from "./content/menu/sidebar/sidebar.component";
import { NavbarComponent } from "./content/menu/navbar/navbar.component";
import { PagesComponent } from "./content/pages/pages.component";
import { HomeComponent } from "./content/pages/home/home.component";
import { InputTextComponent } from "./content/pages/tag/input-text/input-text.component";
import { CalendarComponent } from "./content/pages/tag/calendar/calendar.component";
import { StepComponent } from "./content/pages/tag/step/step.component";
import { Step03Component } from "./content/pages/tag/step/step03/step03.component";
import { Step02Component } from "./content/pages/tag/step/step02/step02.component";
import { Step01Component } from "./content/pages/tag/step/step01/step01.component";
import { AutocompleteComponent } from "./content/pages/tag/autocomplete/autocomplete.component";
import { DropdownComponent } from "./content/pages/tag/dropdown/dropdown.component";
import { TextareaComponent } from "./content/pages/tag/textarea/textarea.component";
import { SliderComponent } from "./content/pages/tag/slider/slider.component";
import { CheckboxComponent } from "./content/pages/tag/checkbox/checkbox.component";
import { ButtonComponent } from "./content/pages/tag/button/button.component";
import { UploadFileComponent } from "./content/pages/tag/upload-file/upload-file.component";
import { ExampleComponent } from "./content/pages/tag/example/example.component";
import { DatatableNormalComponent } from "./content/pages/tag/datatable-normal/datatable-normal.component";
import { SponsorsComponent } from "./content/pages/sponsors/sponsors.component";
import { ScholarshipAnnouncementComponent } from "./content/pages/scholarship-announcement/scholarship-announcement.component";
import { ApplyforscholarshipComponent } from "./content/pages/applyforscholarship/applyforscholarship.component";
import { ScholarshipComponent } from "./content/pages/scholarship/scholarship.component";
import { ScholarshipAnnouncementDetailComponent } from "./content/pages/scholarship-announcement-detail/scholarship-announcement-detail.component";
import { OfficerComponent } from "./content/pages/officer/officer.component";
import { ReguserComponent } from "./content/pages/reguser/reguser.component";
import { RegscholarshipComponent } from "./content/pages/regscholarship/regscholarship.component";
import { FamilyComponent } from "./content/pages/family-and-address/family/family.component";
import { FamilyAndAddressInfoComponent } from "./content/pages/apply-scholarship/family-and-address/family-and-address.component";
import { FamilyInformationComponent } from "./content/pages/apply-scholarship/family-and-address/family-information/family-information.component";
import { SiblingInformationComponent } from "./content/pages/apply-scholarship/family-and-address/sibling-information/sibling-information.component";
import { AddressInformationComponent } from "./content/pages/apply-scholarship/family-and-address/address-information/address-information.component";
import { NewsDetailComponent } from "./content/pages/news-detail/news-detail.component";
import { DateFormatPipe } from "./pipe/datepipe/date-format.pipe";
//Service
import { UtilsService } from "./services/utils.service";
import { AuthenticationService } from "./services/authentication.service";
import { StepService } from "./services/tag/step.service";
import { OfficerService } from "./services/officer.service";
import { UserService } from "./services/user.service";
import { ApplyScholarshipComponent } from "./content/pages/apply-scholarship/apply-scholarship.component";
import { ApplicantInfoComponent } from "./content/pages/apply-scholarship/applicant-info/applicant-info.component";
import { StudentComponent } from "./content/pages/student/student.component";
import { StudentService } from "./services/student.service";
import { FamilyAndAddressComponent } from "./content/pages/family-and-address/family-and-address.component";
import { ScholarshipInfoComponent } from "./content/pages/apply-scholarship/scholarship-info/scholarship-info.component";
import { FamilyFinancialComponent } from "./content/pages/apply-scholarship/family-financial/family-financial.component";
import { MainNewsComponent } from "./content/pages/main-news/main-news.component";
import { SiblingComponent } from "./content/pages/family-and-address/sibling/sibling.component";
import { AddressComponent } from "./content/pages/family-and-address/address/address.component";
import { FamilyAndAddressService } from './services/familyandaddress.service';
import { SiblingService } from './services/sibling.service';
import { NgProgressModule } from 'ngx-progressbar';
import { DocumentRequestComponent } from './content/pages/document-request/document-request.component';
import { DocumentrequestService } from './services/documentrequest.service';
import { ApplicationDocumentComponent } from './content/pages/application-document/application-document.component';
import { ApplicationDocumentService } from './services/application-document.service';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { IntervieweesSelectionComponent } from './content/pages/interviewees-selection/interviewees-selection.component';
import { ScholarshipEarningComponent } from './content/pages/scholarship-earning/scholarship-earning.component';
import { AutocompleteService } from './services/autocomplete.service';
//Router
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "example", component: ExampleComponent },
  {
    path: "pages",
    canLoad: [UtilsService],
    component: PagesComponent,
    children: [
      { path: "sponsors", component: SponsorsComponent },
      {
        path: "scholarship-announcement",
        component: ScholarshipAnnouncementComponent
      },
      { path: "apply-scholarship", component: ApplyScholarshipComponent },
      { path: "scholarship", component: ScholarshipComponent },
      {
        path: "announcement-detail",
        component: ScholarshipAnnouncementDetailComponent
      },
      { path: "documents-screening", component: DocumentsscreeningComponent},
      { path: "officer", component: OfficerComponent },
      { path: "reguser", component: ReguserComponent },
      { path: "school", component: SchoolComponent },
      { path: "major", component: MajorComponent },
      { path: "news", component: NewsComponent },
      { path: "regscholarship", component: RegscholarshipComponent },
      { path: "titlename", component: TitlenameComponent },
      { path: "student", component: StudentComponent },
      { path: "family-and-address", component: FamilyAndAddressComponent },
      { path: "document-request", component: DocumentRequestComponent},
      { path: "application-document", component: ApplicationDocumentComponent},
      { path: "interviewees-selection", component: IntervieweesSelectionComponent},
      { path: "scholarship-earning", component: ScholarshipEarningComponent},
    ]
  },
  { path: "news", component: MainNewsComponent },
  { path: "news/:id", component: NewsDetailComponent }
];

export function startupServiceFactory(
  startupService: StartupService
): Function {
  return () => startupService.loadProvinces();
}

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
    SponsorsComponent,
    ScholarshipAnnouncementComponent,
    ApplyforscholarshipComponent,
    ScholarshipComponent,
    ScholarshipAnnouncementDetailComponent,
    OfficerComponent,
    ReguserComponent,
    StepComponent,
    Step01Component,
    Step02Component,
    Step03Component,
    RegscholarshipComponent,
    SchoolComponent,
    MajorComponent,
    NewsComponent,
    ApplyScholarshipComponent,
    ApplicantInfoComponent,
    TitlenameComponent,
    StudentComponent,
    FamilyAndAddressComponent,
    MainNewsComponent,
    ScholarshipInfoComponent,
    FamilyFinancialComponent,
    MainNewsComponent,
    FamilyAndAddressInfoComponent,
    FamilyInformationComponent,
    SiblingInformationComponent,
    AddressInformationComponent,
    MainNewsComponent,
    NewsDetailComponent,
    UploadDocumentComponent,
    FamilyComponent,
    SiblingComponent,
    AddressComponent,
    DateFormatPipe,
    DocumentsscreeningComponent,
    DocumentRequestComponent,
    ApplicationDocumentComponent,
    IntervieweesSelectionComponent,
    LoginComponent,
    ScholarshipEarningComponent,
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
    SliderModule,
    StepsModule,
    GrowlModule,
    TooltipModule,
    DialogModule,
    EditorModule,
    TabViewModule,
    FileUploadModule,
    DataScrollerModule,
    DataListModule,
    ProgressBarModule,
    NgProgressModule,
    CurrencyMaskModule,
  ],
  providers: [
    AuthenticationService,
    UtilsService,
    StepService,
    SchoolService,
    ScholarshipannouncementService,
    ScholarshipService,
    MajorService,
    NewsService,
    SponsorsService,
    ApplyscholarshipService,
    OfficerService,
    UserService,
    StartupService,
    StudentService,
    EducationLevelService,
    FamilyAndAddressService,
    DocumentrequestService,
    ParentService,
    AddressService,
    SiblingService,
    DocumentsService,
    ApplicationTrackingService,
    CalendarModel,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    TitleNameService,
    ApplicationDocumentService,
    AutocompleteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
