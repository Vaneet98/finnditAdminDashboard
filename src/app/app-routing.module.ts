import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { BusinessessComponent } from './components/businessess/businessess.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UsersComponent } from './components/users/users.component';
import { LisitingComponent } from './components/lisiting/lisiting.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { FormsComponent } from './components/forms/forms.component';
import {AdminBannersComponent} from "./components/admin-banners/admin-banners.component"
import {MarchantBannersComponent} from "./components/marchant-banners/marchant-banners.component"
import { MyTeamComponent } from './components/my-team/my-team.component';
import { RoleAndPermissionsComponent } from './components/role-and-permissions/role-and-permissions.component';
import { TagsComponent } from './components/tags/tags.component';
import { QueriesComponent } from './components/queries/queries.component';
import { AuditAndLogsComponent } from './components/audit-and-logs/audit-and-logs.component';
import { TiersComponent } from './components/tiers/tiers.component';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { ManageNotificationComponent } from './components/manage-notification/manage-notification.component';
import { DashBoardGuardGuard } from './components/dash-board-guard.guard';
const routes: Routes = [
  { path: '', component: PagesLoginComponent,  },
  { path: 'register', component: PagesRegisterComponent },
  // { path: 'dashboard', component: DashboardComponent,canActivate: [DashBoardGuardGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tables-data', component: TablesDataComponent },
  { path: 'tables-general', component: TablesGeneralComponent  },
  { path: 'pages-blank', component: PagesBlankComponent },
  { path: 'pages-contact', component: PagesContactComponent  },
  { path: 'pages-faq', component: PagesFaqComponent },
  { path: 'user-profile', component: UsersProfileComponent  },
  { path: 'business', component: BusinessessComponent  },
  { path: 'categories', component: CategoriesComponent  },
  { path: 'user', component: UsersComponent  },
  { path: 'listing', component: LisitingComponent },
  { path: 'reward', component: RewardsComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'adminbanner', component: AdminBannersComponent },
  { path: 'merchantbanner', component: MarchantBannersComponent },
  { path: 'myteam', component:  MyTeamComponent },
  { path: 'roleandpermission', component: RoleAndPermissionsComponent },
  { path: 'tags', component:TagsComponent },
  { path: 'queries', component: QueriesComponent },
  { path: 'auditandlogs', component:AuditAndLogsComponent },
  { path: 'tier', component: TiersComponent },
  { path: 'subsription', component:SubscriptionPlansComponent },
  { path: 'feedback', component:FeedbackFormComponent },
  { path: 'managenotification', component:  ManageNotificationComponent },
    { path: '**', component: PagesError404Component  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
