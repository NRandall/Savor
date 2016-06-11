angular
  .module('savor.list', [])
  .directive('list', list);

  /**
   * This directive allows us to use the list
   */
  function list() {
  return {
    templateUrl: '/views/components/list/list.tpl.html',
    controller: gridReviewCtrl,
    controllerAs: 'list'
  };
}
