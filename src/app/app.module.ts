import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


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
import { ToastrModule } from 'ngx-toastr';
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
import { DialogComponent } from './dialog/dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategorySubL1Component } from './components/category-sub-l1/category-sub-l1.component';
import { CategorySubL2Component } from './components/category-sub-l2/category-sub-l2.component';
import { TagAdminDetailComponent } from './components/tag-admin-detail/tag-admin-detail.component';
import { CommonComponent } from './common';
import { SortPipe } from './sort.pipe';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

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
    DialogComponent,
    DeleteDialogComponent,
    CategorySubL1Component,
    CategorySubL2Component,
    TagAdminDetailComponent,
    CommonComponent,
    SortPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
