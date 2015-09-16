# angular-distribute-transclude
[![Build Status](https://travis-ci.org/tfiwm/angular-distribute-transclude.svg?branch=master)](https://travis-ci.org/tfiwm/angular-distribute-transclude)
[![NPM](https://img.shields.io/npm/v/angular-distribute-transclude.svg)](https://www.npmjs.com/package/angular-distribute-transclude)
![License](https://img.shields.io/npm/l/angular-translate.svg)

This is an angularjs directive which offers you a simple way to transclude your html to specific places in your template

Here is an example:


The directive template:
```html
<div class="my-custom-header">
    <div content-select=".header-profile">
        The matching element will be appended ;)
    </div>

    <div>Some directive content....</div>
    <p>Minions ipsum ullamco incididunt jeje dolore nisi aaaaaah wiiiii aliqua esse. Irure uuuhhh commodo wiiiii officia bee do bee do bee do sit amet potatoooo veniam. Uuuhhh ut labore jiji. Bappleees butt officia ut bananaaaa esse hana dul sae aliqua chasy. Ad commodo sit amet underweaaar quis po kass para tú enim aute jiji poopayee. Tatata bala tu daa nisi dolore para tú dolor. Ullamco po kass daa exercitation tank yuuu! Ullamco. </p>

    <div content-select=".header-navbar" content-replace>
        If i use "trans-replace" my element will be replaced and this content removed!
    </div>

    Nice Header :)
</div>
```

If you are using *distribute-transclude*, don't add the property _transclude_ to your directive config!!!
Because angular can only handle one transclude on an element and this will be done by *distribute-transclude*

```javascript
app.directive('myCustomHeader', function() {
  return {
    scope: {
      v1: '=',
      v2: '@',
    },
    restrict: 'E',
    require: 'distributeTransclude',
    // transclude: true <-- Don't do this!
    controller: function() {},
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'my-custom-header.directive.template.html',
  };
});
```

```html
<my-custom-header distribute-transclude>
    <div class="header-profile">Header Profile</div>
    <nav class="header-navbar">
        Some nav buttons
    </nav>

    All the other elements which are not matching
    <div>will be never transcluded!!!</div>
</my-custom-header>
```
