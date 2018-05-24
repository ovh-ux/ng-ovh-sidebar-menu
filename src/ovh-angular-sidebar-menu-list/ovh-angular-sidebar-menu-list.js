import sidebarMenuListItem from './ovh-angular-sidebar-menu-list-item/ovh-angular-sidebar-menu-list-item';
import sidebarMenuListDirective from './ovh-angular-sidebar-menu-list.directive';

export default angular
    .module("ovh-angular-sidebar-menu-list", [sidebarMenuListItem])
    .directive("sidebarMenuList", sidebarMenuListDirective)
    .name;
