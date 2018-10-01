import sidebarMenuListItemItemDirective from './ovh-angular-sidebar-menu-list-item.directive';
import sidebarMenuListItemItemFactory from './ovh-angular-sidebar-menu-list-item.factory';
import 'angular-vs-repeat';

export default angular
    .module("ovh-angular-sidebar-menu-list-item", ['vs-repeat'])
    .factory("SidebarMenuListItem", sidebarMenuListItemItemFactory)
    .directive("sidebarMenuListItem", sidebarMenuListItemItemDirective)
    .name;
