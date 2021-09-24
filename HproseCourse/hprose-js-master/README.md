<p align="center"><img src="http://hprose.com/banner.@2x.png" alt="Hprose" title="Hprose" width="650" height="200" /></p>

<a href="https://promisesaplus.com/">
    <img src="https://promisesaplus.com/assets/logo-small.png" alt="Promises/A+ logo" title="Promises/A+ 1.1 compliant" align="right" />
</a>

# Hprose for JavaScript

[![Join the chat at https://gitter.im/hprose/hprose-js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hprose/hprose-js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/hprose/hprose-js.svg?branch=master)](https://travis-ci.org/hprose/hprose-js)
[![Sauce Test Status](https://saucelabs.com/buildstatus/hprose-js?v2.0.12)](https://saucelabs.com/u/hprose-js)
[![bower version](https://img.shields.io/bower/v/hprose.svg)](http://bower.io/search/?q=hprose)
[![npm version](https://img.shields.io/npm/v/hprose-js.svg)](https://www.npmjs.com/package/hprose-js)
[![License](https://img.shields.io/github/license/hprose/hprose-js.svg)](http://opensource.org/licenses/MIT)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/hprose-js.svg)](https://saucelabs.com/u/hprose-js)

>---
- **[Introduction](#introduction)**
    - **[Browser support](#browser-support)**
    - **[Hybird app support](#hybird-app-support)**
- **[Usage](#usage)**
    - **[Exception Handling](#exception-handling)**

>---

## Introduction

*Hprose* is a High Performance Remote Object Service Engine.

It is a modern, lightweight, cross-language, cross-platform, object-oriented, high performance, remote dynamic communication middleware. It is not only easy to use, but powerful. You just need a little time to learn, then you can use it to easily construct cross language cross platform distributed application system.

*Hprose* supports many programming languages, for example:

* AAuto Quicker
* ActionScript
* ASP
* C++
* Dart
* Delphi/Free Pascal
* dotNET(C#, Visual Basic...)
* Golang
* Java
* JavaScript
* Node.js
* Objective-C
* Perl
* PHP
* Python
* Ruby
* ...

Through *Hprose*, You can conveniently and efficiently intercommunicate between those programming languages.

This project is the implementation of Hprose for JavaScript.

Hprose 2.0 for JavaScript Documents（中文版）: https://github.com/hprose/hprose-js/wiki 

### Browser support

#### Desktop browsers

* Google Chrome
* Apple Safari
* Mozilla Firefox
* Opera
* Microsoft Internet Explorer 6.0+
* Netscape 7+
* Konqueror
* ...

#### Mobile browsers

* Apple Safari on iOS
* Google Chrome on iOS
* Google Chrome on Android
* Default Browser on Android
* Internet Explorer on Windows Phone
* Opera Mobile
* Default Browser on WebOS
* Default Browser on Blackberry
* Default Browser on N9 MeeGo
* Mozilla Firefox on N9 MeeGo
* \*Default Browser on Symbian
* \*Opera Mini
* \*Pocket IE
* ...

All of the above browsers (except asterisk marked) support cross-domain invoking with Hprose for JavaScript.

### Hybird app support

* ionic + cordova (http, tcp, websocket)
* Chrome extentions (http, tcp, websocket)
* APICloud (http, tcp*)
* DCloud (http)
* AppCan (http)
* DeviceOne (http)
* ... (http, websocket)

TCP is only available on iOS for APICloud, because there is a bug of APICloud Android SDK, and they don't want to fix this bug.

## Usage

You don't need use the javascript source files. You only need include `hprose.js` in your html.

The file `FlashHttpRequest.swf` you can put it on anywhere, and then specify its load path by setting the `flashpath` attribute in the `script` tag. If you omit this attribute, the default path is current path.

### Exception Handling

If an error occurred on the server, or your service function/method throw an exception, it will be sent to the client. You need to pass an error callback function after succuss callback function to receive it. If you omit this callback function, the client will ignore the exception, like never happened.

For example:

```html
<html>
<head>
<script type="text/javascript" src="hprose.js" flashpath="/"></script>
</head>
<body>
<script type="text/javascript">
    var client = hprose.Client.create("http://www.hprose.com/example/", ["hello"]);
    client.hello("World!")
    .then(function(result) {
        alert(result);
    }, function(err) {
        alert(err);
    });
</script>
</body>
```
