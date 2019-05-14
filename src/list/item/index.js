import angular from 'angular';
import 'angular-vs-repeat';
import 'ng-slide-down';

import factory from './factory';
import directive from './directive';

const moduleName = 'ngOvhSidebarMenuListItem';

angular
  .module(moduleName, ['vs-repeat', 'ng-slide-down'])
  .factory('SidebarMenuListItem', factory)
  .directive('sidebarMenuListItem', directive);

export default moduleName;
