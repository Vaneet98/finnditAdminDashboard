import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';

import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';

import {FormsModule} from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BusinessessComponent } from './components/businessess/businessess.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UsersComponent } from './components/users/users.component';
import { LisitingComponent } from './components/lisiting/lisiting.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { FormsComponent } from './components/forms/forms.component';
import { AdminBannersComponent } from './components/admin-banners/admin-banners.component';
import { MarchantBannersComponent } from './components/marchant-banners/marchant-banners.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { RoleAndPermissionsComponent } from './components/role-and-permissions/role-and-permissions.component';
import { TagsComponent } from './components/tags/tags.component';
import { QueriesComponent } from './components/queries/queries.component';
import { AuditAndLogsComponent } from './components/audit-and-logs/audit-and-logs.component';
import { TiersComponent } from './components/tiers/tiers.component';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { ManageNotificationComponent } from './components/manage-notification/manage-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    BusinessessComponent,
    CategoriesComponent,
    UsersComponent,
    LisitingComponent,
    RewardsComponent,
    FormsComponent,
    AdminBannersComponent,
    MarchantBannersComponent,
    MyTeamComponent,
    RoleAndPermissionsComponent,
    TagsComponent,
    QueriesComponent,
    AuditAndLogsComponent,
    TiersComponent,
    SubscriptionPlansComponent,
    FeedbackFormComponent,
    ManageNotificationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
