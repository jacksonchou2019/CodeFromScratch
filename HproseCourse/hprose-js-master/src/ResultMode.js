/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * ResultMode.js                                          *
 *                                                        *
 * hprose ResultMode for JavaScript.                      *
 *                                                        *
 * LastModified: Nov 18, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (hprose, global) {
    'use strict';

    global.HproseResultMode  =
    hprose.ResultMode = {
        Normal: 0,
        Serialized: 1,
        Raw: 2,
        RawWithEndTag: 3
    };
    hprose.Normal        = hprose.ResultMode.Normal;
    hprose.Serialized    = hprose.ResultMode.Serialized;
    hprose.Raw           = hprose.ResultMode.Raw;
    hprose.RawWithEndTag = hprose.ResultMode.RawWithEndTag;

})(hprose, hprose.global);
