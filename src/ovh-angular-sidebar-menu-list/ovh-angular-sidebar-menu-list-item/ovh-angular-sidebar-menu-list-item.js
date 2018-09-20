import sidebarMenuListItemItemDirective from './ovh-angular-sidebar-menu-list-item.directive';
import sidebarMenuListItemItemFactory from './ovh-angular-sidebar-menu-list-item.factory';
import 'ng-slide-down';

export default angular
    .module("ovh-angular-sidebar-menu-list-item", ['ng-slide-down'])
    .factory("SidebarMenuListItem", sidebarMenuListItemItemFactory)
    .directive("sidebarMenuListItem", sidebarMenuListItemItemDirective)
    .name;
