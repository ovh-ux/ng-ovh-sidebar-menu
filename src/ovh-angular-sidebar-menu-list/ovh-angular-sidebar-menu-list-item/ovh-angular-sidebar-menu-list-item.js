import sidebarMenuListItemItemDirective from './ovh-angular-sidebar-menu-list-item.directive';
import sidebarMenuListItemItemFactory from './ovh-angular-sidebar-menu-list-item.factory';

export default angular
    .module("ovh-angular-sidebar-menu-list-item", [])
    .factory("SidebarMenuListItem", sidebarMenuListItemItemFactory)
    .directive("sidebarMenuListItem", sidebarMenuListItemItemDirective)
    .name;
