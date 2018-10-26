import angular from 'angular';

import sidebarMenuListItem from './ovh-angular-sidebar-menu-list-item/ovh-angular-sidebar-menu-list-item';
import sidebarMenuListDirective from './ovh-angular-sidebar-menu-list.directive';

const moduleName = 'ovh-angular-sidebar-menu-list';

angular
  .module('ovh-angular-sidebar-menu-list', [sidebarMenuListItem])
  .directive('sidebarMenuList', sidebarMenuListDirective);

export default moduleName;
