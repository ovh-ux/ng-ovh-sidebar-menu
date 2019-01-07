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
import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-angular-actions-menu';

import ngOvhSidebarMenuList from './list';

import directive from './directive';
import provider from './provider';

import './index.less';

const moduleName = 'ngOvhSidebarMenu';

angular
  .module(moduleName, [
    'ui.router',
    'pascalprecht.translate',
    'ovh-angular-actions-menu',
    ngOvhSidebarMenuList,
  ])
  .provider('SidebarMenu', provider)
  .directive('sidebarMenu', directive)
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
