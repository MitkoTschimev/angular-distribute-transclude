/**
 *
 */
'use strict';

var distributeTranscludeDirective = function() {
    return {
        restrict: 'A',
        scope: false,
        transclude: true,
        link: function(scope, elem, attr, ctrl, transclude) {
            transclude(scope, function(clone) {
                var transcludeSelectors = elem[0].querySelectorAll('[content-select]');
                angular.forEach(clone, function(cloneEl) {
                    var found = false;
                    for (var i = transcludeSelectors.length; i--;) {
                        var transcludeToElement = transcludeSelectors[i];
                        if (isAllowedNode(cloneEl) && matches(cloneEl, transcludeToElement.attributes['content-select'])) {
                            if(transcludeToElement.attributes['trans-replace']) {
                                if(transcludeToElement.parentNode) {
                                    transcludeToElement.parentNode.replaceChild(cloneEl, transcludeToElement);
                                } else {
                                    console.error('Can\'t find parentNode!');
                                }
                            } else {
                                transcludeToElement.appendChild(cloneEl);
                            }
                            found = true;
                        }
                    }
                    if (!found) {
                        cloneEl.remove();
                    }
                });
            });
        },
        controller: function() {}
    };

    function isAllowedNode(node) {
        var nodeType = node.nodeType;
        return nodeType === 1 || nodeType === 9;
    }

    function matches(element, selector) {
        if (element.matches) {
            return element.matches(selector.value);
        } else if (element.matchesSelector) {
            return element.matchesSelector(selector.value);
        } else if (element.querySelectorAll) {
            return supportOlderBrowser(element, selector.value);
        } else {
            console.error('This browser doesn\'t support selector matches -> https://developer.mozilla.org/en-US/docs/Web/API/Element/matches');
        }
        return false;
    }

    function supportOlderBrowser(element, selector) {
        var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
        var i = 0;

        while (matches[i] && matches[i] !== element) {
            i++;
        }

        return matches[i] ? true : false;
    }
};

var tfiwmModule = angular.module('tfiwm.distributetransclude', []);
tfiwmModule.directive('distributeTransclude', distributeTranscludeDirective);
