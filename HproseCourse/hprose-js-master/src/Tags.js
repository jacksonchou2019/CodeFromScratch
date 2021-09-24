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
 * Tags.js                                                *
 *                                                        *
 * hprose tags enum for JavaScript.                       *
 *                                                        *
 * LastModified: Nov 18, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (hprose, global) {
    'use strict';
    global.HproseTags =
    hprose.Tags = {
        /* Serialize Tags */
        TagInteger      : 'i',
        TagLong         : 'l',
        TagDouble       : 'd',
        TagNull         : 'n',
        TagEmpty        : 'e',
        TagTrue         : 't',
        TagFalse        : 'f',
        TagNaN          : 'N',
        TagInfinity     : 'I',
        TagDate         : 'D',
        TagTime         : 'T',
        TagUTC          : 'Z',
        TagBytes        : 'b', // Only support bytes in binary mode.
        TagUTF8Char     : 'u',
        TagString       : 's',
        TagGuid         : 'g',
        TagList         : 'a',
        TagMap          : 'm',
        TagClass        : 'c',
        TagObject       : 'o',
        TagRef          : 'r',
        /* Serialize Marks */
        TagPos          : '+',
        TagNeg          : '-',
        TagSemicolon    : ';',
        TagOpenbrace    : '{',
        TagClosebrace   : '}',
        TagQuote        : '"',
        TagPoint        : '.',
        /* Protocol Tags */
        TagFunctions    : 'F',
        TagCall         : 'C',
        TagResult       : 'R',
        TagArgument     : 'A',
        TagError        : 'E',
        TagEnd          : 'z'
    };
})(hprose, hprose.global);
