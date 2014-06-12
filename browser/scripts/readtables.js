(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([
            'exports',
            'parser',
            'syntax',
            'underscore'
        ], factory);
    } else if (typeof exports === 'object') {
        factory(exports, require('./parser'), require('./syntax'), require('underscore'));
    }
}(this, function (exports$2, parser, syntax, _) {
    function CustomReader(parser$2) {
        this.buffer = [];
        this.parser = parser$2;
        this.origLineNumber = parser$2.lineNumber();
        this.origLineStart = parser$2.lineStart();
        this.origIndex = parser$2.index();
    }
    CustomReader.create = function (cls) {
        function _Reader() {
            CustomReader.apply(this, arguments);
        }
        _Reader.prototype = _.extend(Object.create(CustomReader.prototype), cls);
        return _Reader;
    };
    CustomReader.prototype.expect = function (ch) {
        var parser$2 = this.parser;
        var punc = parser$2.getQueued() || parser$2.scanPunctuator();
        if (punc.type !== parser$2.Token.Punctuator && punc.value !== ch) {
            throw new Error('unexpected: ' + punc.value + ', wanted: ' + ch);
        }
        return punc;
    };
    CustomReader.prototype.match = function () {
        var chars = Array.prototype.slice.call(arguments);
        var parser$2 = this.parser;
        var idx = parser$2.index();
        var matched = true;
        // First, we need to walk through any tokens that are queued
        // in the readtable. This can happen because readtables can be
        // recursively called, so there might be some tokens we need
        // to check here first.
        for (var i = 0; i < chars.length; i++) {
            var tok = parser$2.peekQueued(i);
            if (!tok) {
                break;
            }
            matched = matched && tok.type === parser$2.Token.Punctuator && tok.value === chars[i];
        }
        for (i; i < chars.length; i++) {
            try {
                var punc = parser$2.scanPunctuator();
                matched = matched && punc.value === chars[i];
            } catch (e) {
                // TODO: check specific error type here
                //console.log(e);
                matched = false;
                break;
            }
        }
        parser$2.index(idx);
        return matched;
    };
    CustomReader.prototype.advance = function () {
        this.add(this.parser.advance());
    };
    CustomReader.prototype.readToken = function () {
        this.add(this.parser.readToken([], false, false));
    };
    CustomReader.prototype.reset = function () {
        this.parser.index(this.origIndex);
        this.parser.lineStart(this.origLineStart);
        this.parser.lineNumber(this.origLineNumber);
        this.finish();
    };
    CustomReader.prototype.add = function (toks) {
        if (Array.isArray(toks)) {
            this.buffer = this.buffer.concat(toks);
        } else {
            this.buffer.push(toks);
        }
    };
    CustomReader.prototype.inspectTokens = function (func) {
        var i = this.buffer.length;
        func();
        return this.buffer.slice(i);
    };
    CustomReader.prototype.getTokens = function (func) {
        var i = this.buffer.length;
        func();
        var toks = this.buffer.slice(i);
        this.buffer = this.buffer.slice(0, i);
        return toks;
    };
    CustomReader.prototype.lookbehind = function (n) {
        this.parser.assert(n > 0, 'lookbehind requires a number greater than 0');
        var len = this.buffer.length, i = len - n;
        return i < len ? this.buffer[i] : null;
    };
    CustomReader.prototype.finish = function () {
        var buf = this.buffer;
        this.buffer = [];
        return buf;
    };
    CustomReader.prototype.readPunc = function (ch) {
        var tok;
        if (ch) {
            tok = this.expect(ch);
        } else {
            tok = this.parser.scanPunctuator();
        }
        this.add(tok);
    };
    CustomReader.prototype.readIdent = function () {
        this.add(this.parser.scanIdentifier());
    };
    CustomReader.prototype.readIdent = function () {
        this.add(this.parser.scanIdentifier());
    };
    CustomReader.prototype.readLiteral = function () {
    }    //this.add(this.parser.scanIdentifier());
;
    exports$2.CustomReader = CustomReader;
}));
//# sourceMappingURL=readtables.js.map