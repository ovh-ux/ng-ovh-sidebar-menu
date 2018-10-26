/**
 *  @ngdoc overview
 *  @name sidebarMenu
 *  @description
 *  # Sidebar Menu
 *
 *  Manage and display a left menu tree. This is the main module which holds everything together!
 *  See README for more informations.
 */

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import translate from 'angular-translate';
import actionsMenu from 'ovh-angular-actions-menu';

import sidebarMenuList from './ovh-angular-sidebar-menu-list/ovh-angular-sidebar-menu-list';

import sideMenuDirective from './ovh-angular-sidebar-menu.directive';
import SidebarMenuProvider from './ovh-angular-sidebar-menu.provider';

import './less/ovh-angular-sidebar-menu.less';

const moduleName = 'ovh-angular-sidebar-menu';

angular
  .module(moduleName, [
    uiRouter,
    translate,
    actionsMenu,
    sidebarMenuList,
  ])
  .provider('SidebarMenu', SidebarMenuProvider)
  .directive('sidebarMenu', sideMenuDirective)
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
