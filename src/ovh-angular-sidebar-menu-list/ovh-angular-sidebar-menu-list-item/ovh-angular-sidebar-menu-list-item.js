import angular from 'angular';

import sidebarMenuListItemItemDirective from './ovh-angular-sidebar-menu-list-item.directive';
import sidebarMenuListItemItemFactory from './ovh-angular-sidebar-menu-list-item.factory';
import 'angular-vs-repeat';

const moduleName = 'ovh-angular-sidebar-menu-list-item';

angular
  .module(moduleName, ['vs-repeat'])
  .factory('SidebarMenuListItem', sidebarMenuListItemItemFactory)
  .directive('sidebarMenuListItem', sidebarMenuListItemItemDirective);

export default moduleName;
