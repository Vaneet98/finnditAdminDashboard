// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hostULR:"https://ncg3n927x2.execute-api.ap-south-1.amazonaws.com/dev/",
  LoginURL: 'admin/v1/admin/login',
  editAdminURL:'admin/v1/admin/edit-profile',
  commanRoleURL:'admin/v1/common/roles',
  RegisterURL:'admin/v1/admin',
  getAdmin:'admin/v1/admin',
  changePassword:'admin/v1/admin/profile/change-password',
  logoutURL:'admin/v1/admin/logout',
  CategoryURL:'admin/v1/categories?limit=1000&skip=0',
  SubcategoryL1URL:'admin/v1/subCategories?limit=100&skip=0&categoryId=',
  SubcategoryL2URL:'admin/v1/subCategories/level2?limit=1000&skip=0&subCategoryLevel1Id=',
  SubscriptionPlan:'admin/v1/subscriptionPlan',
  SubscriptionPlanEdit:'admin/v1/subscriptionPlan',
  SubscriptionPlanDelete:'admin/v1/subscriptionPlan',
  TageURL:'admin/v1/tags?limit=1000&skip=0&type=',
  TagaddURL:'admin/v1/tags',
  TagAdminDetailURL:'admin/v1/tags/assignedToListing?limit=1000&skip=0',
  UnassignedURL:'admin/v1/tags/unAssign',
  UserUrl:'admin/v1/customers',
  adminBannerURL:'http://localhost:3000/admin/v1/adminBanner?limit=100&skip=0',
  adminBannerdeleteURL:'http://localhost:3000/admin/v1/adminBanner',
  myTeamURL:'admin/v1/admin?limit=100&skip=0',
  roleAndPermission:'admin/v1/roles?limit=100&skip=0',
  roleAndPermissionById:'admin/v1/roles/',
  HorizontalTierGetDetail:'http://localhost:3000/admin/v1/tier',
  HorizontalTierDeactivate:'http://localhost:3000/admin/v1/tier/deactivited'

};
// Admin/admin-v1-admin-login-post
/* https://ncg3n927x2.execute-api.ap-south-1.amazonaws.com/dev/api-docs/?urls.primaryName=API%20-%20Admin#/Admin
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
