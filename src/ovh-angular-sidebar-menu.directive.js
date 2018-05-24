/**
 *  @ngdoc directive
 *  @name sidebarMenu.directive:sidebarMenu
 *
 *  @restrict A
 *
 *  @description
 *  <p>This is the base directive to load into your universe code. This directive will load the "root" items and will manage (with {@link sidebarMenu.service:SidebarMenu SidebarMenu service}) sub items loading and display.</p>
 *  <p>Basically, the directive will load the other module's directives (sidebarMenuMenu and sidebarMenuMenuItem).</p>
 */
import SidebarMenuCtrl from './ovh-angular-sidebar-menu.controller';

export default function () {
    "use strict";

    return {
        template: require("./ovh-angular-sidebar-menu.html"),
        restrict: "A",
        replace: true,
        controllerAs: "sideBarCtrl",
        controller: SidebarMenuCtrl,
        scope: {
            sidebarNamespace: "="
        }
    };
};
