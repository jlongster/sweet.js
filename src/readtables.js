
(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['exports', 'parser', 'syntax', 'underscore'], factory);
    }
    else if (typeof exports === 'object') {
        factory(exports,
                require('./parser'),
                require('./syntax'),
                require('underscore'));
    }
}(this, function (exports, parser, syntax, _) {

    function CustomReader(parser) {
        this.buffer = [];
        this.parser = parser;
        this.origLineNumber = parser.lineNumber();
        this.origLineStart = parser.lineStart();
        this.origIndex = parser.index();
    }

    CustomReader.create = function(cls) {
        function _Reader() {
            CustomReader.apply(this, arguments);
        }

        _Reader.prototype = _.extend(Object.create(CustomReader.prototype), cls);
        return _Reader;
    };

    CustomReader.prototype.expect = function(ch) {
        var parser = this.parser;
        var punc = parser.getQueued() || parser.scanPunctuator();
        if(punc.type !== parser.Token.Punctuator &&
           punc.value !== ch) {
            throw new Error('unexpected: ' + punc.value +
                            ', wanted: ' + ch);
        }
        return punc;
    };

    CustomReader.prototype.match = function(/* ch1, ch2, ... chN */) {
        var chars = Array.prototype.slice.call(arguments);
        var parser = this.parser;
        var idx = parser.index();
        var matched = true;

        // First, we need to walk through any tokens that are queued
        // in the readtable. This can happen because readtables can be
        // recursively called, so there might be some tokens we need
        // to check here first.
        for(var i=0; i<chars.length; i++) {
            var tok = parser.peekQueued(i);
            if(!tok) {
                break;
            }

            matched = (matched &&
                       tok.type === parser.Token.Punctuator &&
                       tok.value === chars[i]);
        }

        for(i; i<chars.length; i++) {
            try {
                var punc = parser.scanPunctuator();
                matched = matched && punc.value === chars[i];
            }
            catch(e) {
                // TODO: check specific error type here
                //console.log(e);
                matched = false;
                break;
            }
        }
        
        parser.index(idx);
        return matched;
    }

    CustomReader.prototype.advance = function() {
        this.add(this.parser.advance());
    }

    CustomReader.prototype.readToken = function() {
        this.add(this.parser.readToken([], false, false));
    }

    CustomReader.prototype.reset = function() {
        this.parser.index(this.origIndex);
        this.parser.lineStart(this.origLineStart);
        this.parser.lineNumber(this.origLineNumber);
        this.finish();
    };

    CustomReader.prototype.add = function(toks) {
        if(Array.isArray(toks)) {
            this.buffer = this.buffer.concat(toks);
        }
        else {
            this.buffer.push(toks);
        }
    };

    CustomReader.prototype.shadowBuffer = function(func) {
        var prev = this.buffer;
        this.buffer = [];
        func(prev);
        this.buffer = prev;
    };

    CustomReader.prototype.finish = function() {
        var buf = this.buffer;
        this.buffer = [];
        return buf;
    };

    CustomReader.prototype.readPunc = function(ch) {
        var tok;
        if(ch) {
            tok = this.expect(ch);
        }
        else {
            tok = this.parser.scanPunctuator();
        }
        this.add(tok);
    };

    CustomReader.prototype.readIdent = function() {
        this.add(this.parser.scanIdentifier());
    };

    CustomReader.prototype.readIdent = function() {
        this.add(this.parser.scanIdentifier());
    };

    CustomReader.prototype.readLiteral = function() {
        //this.add(this.parser.scanIdentifier());
    };

    exports.CustomReader = CustomReader;
}));
