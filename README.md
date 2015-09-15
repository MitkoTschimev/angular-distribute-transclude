# angularjs-distribute-transclude
[![Build Status](https://travis-ci.org/tfiwm/angularjs-distribute-transclude.svg?branch=master)](https://travis-ci.org/tfiwm/angularjs-distribute-transclude)

This is an angularjs directive which offers you a simple way to transclude your html to specific places in your template

Here is an example:


The directive template:
```html
<div class="my-custom-header">
    <div trans-select=".header-profile">
        The matching element will be appended ;)
    </div>

    <div>Some directive content....</div>
    <p>Minions ipsum ullamco incididunt jeje dolore nisi aaaaaah wiiiii aliqua esse. Irure uuuhhh commodo wiiiii officia bee do bee do bee do sit amet potatoooo veniam. Uuuhhh ut labore jiji. Bappleees butt officia ut bananaaaa esse hana dul sae aliqua chasy. Ad commodo sit amet underweaaar quis po kass para tú enim aute jiji poopayee. Tatata bala tu daa nisi dolore para tú dolor. Ullamco po kass daa exercitation tank yuuu! Ullamco. </p>

    <div trans-select=".header-navbar" trans-replace>
        If i use "trans-replace" my element will be replaced and this content removed!
    </div>

    Nice Header :)
</div>
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
