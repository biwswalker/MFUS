import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './content/pages/home/home.component';
import { ExampleComponent } from './content/pages/tag/example/example.component';
import { UtilsService } from './services/utils.service';
import { PagesComponent } from './content/pages/pages.component';
import { SponsorsComponent } from './content/pages/sponsors/sponsors.component';
import { ScholarshipAnnouncementComponent } from './content/pages/scholarship-announcement/scholarship-announcement.component';
import { ApplyScholarshipComponent } from './content/pages/apply-scholarship/apply-scholarship.component';
import { ScholarshipComponent } from './content/pages/scholarship/scholarship.component';
import { ScholarshipAnnouncementDetailComponent } from './content/pages/scholarship-announcement-detail/scholarship-announcement-detail.component';
import { DocumentsscreeningComponent } from './content/pages/documentsscreening/documentsscreening.component';
import { OfficerComponent } from './content/pages/officer/officer.component';
import { ReguserComponent } from './content/pages/reguser/reguser.component';
import { SchoolComponent } from './content/pages/school/school.component';
import { MajorComponent } from './content/pages/major/major.component';
import { NewsComponent } from './content/pages/news/news.component';
import { RegscholarshipComponent } from './content/pages/regscholarship/regscholarship.component';
import { TitlenameComponent } from './content/pages/titlename/titlename.component';
import { StudentComponent } from './content/pages/student/student.component';
import { FamilyAndAddressComponent } from './content/pages/family-and-address/family-and-address.component';
import { DocumentRequestComponent } from './content/pages/document-request/document-request.component';
import { ApplicationDocumentComponent } from './content/pages/application-document/application-document.component';
import { InterviewSelectionComponent } from './content/pages/interview-selection/interview-selection.component';
import { ScholarshipEarningComponent } from './content/pages/scholarship-earning/scholarship-earning.component';
import { MainNewsComponent } from './content/pages/main-news/main-news.component';
import { NewsDetailComponent } from './content/pages/news-detail/news-detail.component';
import { LoginComponent } from './content/pages/login/login.component';

import { EnsureIsAuth } from './services/ensure-is-authentication.service';

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "example", component: ExampleComponent },
    { path: "news", component: MainNewsComponent },
    { path: "news/:id", component: NewsDetailComponent },
    { path: "login", component: LoginComponent },
    {
        path: "pages",
        canLoad: [UtilsService],
        component: PagesComponent,
        children: [
            { path: "sponsors", component: SponsorsComponent },
            { path: "scholarship-announcement", component: ScholarshipAnnouncementComponent },
            { path: "apply-scholarship", component: ApplyScholarshipComponent },
            { path: "scholarship", component: ScholarshipComponent },
            { path: "announcement-detail", component: ScholarshipAnnouncementDetailComponent },
            { path: "documents-screening", component: DocumentsscreeningComponent },
            { path: "officer", component: OfficerComponent },
            { path: "reguser", component: ReguserComponent },
            { path: "school", component: SchoolComponent, canActivate: [EnsureIsAuth] },
            { path: "major", component: MajorComponent },
            { path: "news", component: NewsComponent },
            { path: "regscholarship", component: RegscholarshipComponent },
            { path: "titlename", component: TitlenameComponent },
            { path: "student", component: StudentComponent },
            { path: "family-and-address", component: FamilyAndAddressComponent },
            { path: "document-request", component: DocumentRequestComponent },
            { path: "application-document", component: ApplicationDocumentComponent },
            { path: "interviewees-selection", component: InterviewSelectionComponent },
            { path: "scholarship-earning", component: ScholarshipEarningComponent },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RoutersModule { }