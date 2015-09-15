'use strict';

describe('tfiwm.distributetransclude module', function() {
  var $compile;
  var $rootScope;
  var $templateCache;
  var template;

  beforeEach(module('test'));
  beforeEach(module('my.templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $templateCache = _$templateCache_;
    template = $templateCache.get('test.app.html');
    $rootScope.vm = {
      v1: 'test-twoway',
      v2: 'test-oneway',
    };
  }));

  describe('The content-select selectors should be appended with the content', function() {
    it('Append with class selector', function() {
      var element = $compile(template)($rootScope);
      $rootScope.$digest();
      expect(element[0].querySelector('.classselector')).not.toBeNull();
    });

    it('Append with attribute selector', function() {
      var element = $compile(template)($rootScope);
      $rootScope.$digest();
      expect(element[0].querySelector('[attr-selector]')).not.toBeNull();
    });

    it('Append with a combination of attribute and class selector', function() {
      var element = $compile(template)($rootScope);
      $rootScope.$digest();
      expect(element[0].querySelector('.classand[attrselector]')).not.toBeNull();
    });
  });

  describe('The content-select selectors with content-replace should be replaced with the content', function() {
    it('Replace the footer', function() {
      var element = $compile(template)($rootScope);
      $rootScope.$digest();
      expect(element[0].querySelector('footer')).toBeNull();
      expect(element[0].querySelector('.replacefooter')).not.toBeNull();
    });
  })
});
