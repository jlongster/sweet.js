
var syn = require('./lib/syntax');
var CustomReader = require('./lib/readtables').CustomReader;

function JSXBailError(message) {
    this.message = message;
}

function JSXReadError(message, parser) {
    var sx = syn.syntaxFromToken({
        type: null,
        value: 'nothing matters',
        lineStart: parser.lineStart(),
        lineNumber: parser.lineNumber(),
        range: [parser.index(), parser.index()+1]
    });

    var err = new syn.MacroSyntaxError('JSX', message, sx)
    return new SyntaxError(syn.printSyntaxError(parser.source(), err));
}

XHTMLEntities = {
    quot: '\u0022',
    amp: '&',
    apos: '\u0027',
    lt: '<',
    gt: '>',
    nbsp: '\u00A0',
    iexcl: '\u00A1',
    cent: '\u00A2',
    pound: '\u00A3',
    curren: '\u00A4',
    yen: '\u00A5',
    brvbar: '\u00A6',
    sect: '\u00A7',
    uml: '\u00A8',
    copy: '\u00A9',
    ordf: '\u00AA',
    laquo: '\u00AB',
    not: '\u00AC',
    shy: '\u00AD',
    reg: '\u00AE',
    macr: '\u00AF',
    deg: '\u00B0',
    plusmn: '\u00B1',
    sup2: '\u00B2',
    sup3: '\u00B3',
    acute: '\u00B4',
    micro: '\u00B5',
    para: '\u00B6',
    middot: '\u00B7',
    cedil: '\u00B8',
    sup1: '\u00B9',
    ordm: '\u00BA',
    raquo: '\u00BB',
    frac14: '\u00BC',
    frac12: '\u00BD',
    frac34: '\u00BE',
    iquest: '\u00BF',
    Agrave: '\u00C0',
    Aacute: '\u00C1',
    Acirc: '\u00C2',
    Atilde: '\u00C3',
    Auml: '\u00C4',
    Aring: '\u00C5',
    AElig: '\u00C6',
    Ccedil: '\u00C7',
    Egrave: '\u00C8',
    Eacute: '\u00C9',
    Ecirc: '\u00CA',
    Euml: '\u00CB',
    Igrave: '\u00CC',
    Iacute: '\u00CD',
    Icirc: '\u00CE',
    Iuml: '\u00CF',
    ETH: '\u00D0',
    Ntilde: '\u00D1',
    Ograve: '\u00D2',
    Oacute: '\u00D3',
    Ocirc: '\u00D4',
    Otilde: '\u00D5',
    Ouml: '\u00D6',
    times: '\u00D7',
    Oslash: '\u00D8',
    Ugrave: '\u00D9',
    Uacute: '\u00DA',
    Ucirc: '\u00DB',
    Uuml: '\u00DC',
    Yacute: '\u00DD',
    THORN: '\u00DE',
    szlig: '\u00DF',
    agrave: '\u00E0',
    aacute: '\u00E1',
    acirc: '\u00E2',
    atilde: '\u00E3',
    auml: '\u00E4',
    aring: '\u00E5',
    aelig: '\u00E6',
    ccedil: '\u00E7',
    egrave: '\u00E8',
    eacute: '\u00E9',
    ecirc: '\u00EA',
    euml: '\u00EB',
    igrave: '\u00EC',
    iacute: '\u00ED',
    icirc: '\u00EE',
    iuml: '\u00EF',
    eth: '\u00F0',
    ntilde: '\u00F1',
    ograve: '\u00F2',
    oacute: '\u00F3',
    ocirc: '\u00F4',
    otilde: '\u00F5',
    ouml: '\u00F6',
    divide: '\u00F7',
    oslash: '\u00F8',
    ugrave: '\u00F9',
    uacute: '\u00FA',
    ucirc: '\u00FB',
    uuml: '\u00FC',
    yacute: '\u00FD',
    thorn: '\u00FE',
    yuml: '\u00FF',
    OElig: '\u0152',
    oelig: '\u0153',
    Scaron: '\u0160',
    scaron: '\u0161',
    Yuml: '\u0178',
    fnof: '\u0192',
    circ: '\u02C6',
    tilde: '\u02DC',
    Alpha: '\u0391',
    Beta: '\u0392',
    Gamma: '\u0393',
    Delta: '\u0394',
    Epsilon: '\u0395',
    Zeta: '\u0396',
    Eta: '\u0397',
    Theta: '\u0398',
    Iota: '\u0399',
    Kappa: '\u039A',
    Lambda: '\u039B',
    Mu: '\u039C',
    Nu: '\u039D',
    Xi: '\u039E',
    Omicron: '\u039F',
    Pi: '\u03A0',
    Rho: '\u03A1',
    Sigma: '\u03A3',
    Tau: '\u03A4',
    Upsilon: '\u03A5',
    Phi: '\u03A6',
    Chi: '\u03A7',
    Psi: '\u03A8',
    Omega: '\u03A9',
    alpha: '\u03B1',
    beta: '\u03B2',
    gamma: '\u03B3',
    delta: '\u03B4',
    epsilon: '\u03B5',
    zeta: '\u03B6',
    eta: '\u03B7',
    theta: '\u03B8',
    iota: '\u03B9',
    kappa: '\u03BA',
    lambda: '\u03BB',
    mu: '\u03BC',
    nu: '\u03BD',
    xi: '\u03BE',
    omicron: '\u03BF',
    pi: '\u03C0',
    rho: '\u03C1',
    sigmaf: '\u03C2',
    sigma: '\u03C3',
    tau: '\u03C4',
    upsilon: '\u03C5',
    phi: '\u03C6',
    chi: '\u03C7',
    psi: '\u03C8',
    omega: '\u03C9',
    thetasym: '\u03D1',
    upsih: '\u03D2',
    piv: '\u03D6',
    ensp: '\u2002',
    emsp: '\u2003',
    thinsp: '\u2009',
    zwnj: '\u200C',
    zwj: '\u200D',
    lrm: '\u200E',
    rlm: '\u200F',
    ndash: '\u2013',
    mdash: '\u2014',
    lsquo: '\u2018',
    rsquo: '\u2019',
    sbquo: '\u201A',
    ldquo: '\u201C',
    rdquo: '\u201D',
    bdquo: '\u201E',
    dagger: '\u2020',
    Dagger: '\u2021',
    bull: '\u2022',
    hellip: '\u2026',
    permil: '\u2030',
    prime: '\u2032',
    Prime: '\u2033',
    lsaquo: '\u2039',
    rsaquo: '\u203A',
    oline: '\u203E',
    frasl: '\u2044',
    euro: '\u20AC',
    image: '\u2111',
    weierp: '\u2118',
    real: '\u211C',
    trade: '\u2122',
    alefsym: '\u2135',
    larr: '\u2190',
    uarr: '\u2191',
    rarr: '\u2192',
    darr: '\u2193',
    harr: '\u2194',
    crarr: '\u21B5',
    lArr: '\u21D0',
    uArr: '\u21D1',
    rArr: '\u21D2',
    dArr: '\u21D3',
    hArr: '\u21D4',
    forall: '\u2200',
    part: '\u2202',
    exist: '\u2203',
    empty: '\u2205',
    nabla: '\u2207',
    isin: '\u2208',
    notin: '\u2209',
    ni: '\u220B',
    prod: '\u220F',
    sum: '\u2211',
    minus: '\u2212',
    lowast: '\u2217',
    radic: '\u221A',
    prop: '\u221D',
    infin: '\u221E',
    ang: '\u2220',
    and: '\u2227',
    or: '\u2228',
    cap: '\u2229',
    cup: '\u222A',
    'int': '\u222B',
    there4: '\u2234',
    sim: '\u223C',
    cong: '\u2245',
    asymp: '\u2248',
    ne: '\u2260',
    equiv: '\u2261',
    le: '\u2264',
    ge: '\u2265',
    sub: '\u2282',
    sup: '\u2283',
    nsub: '\u2284',
    sube: '\u2286',
    supe: '\u2287',
    oplus: '\u2295',
    otimes: '\u2297',
    perp: '\u22A5',
    sdot: '\u22C5',
    lceil: '\u2308',
    rceil: '\u2309',
    lfloor: '\u230A',
    rfloor: '\u230B',
    lang: '\u2329',
    rang: '\u232A',
    loz: '\u25CA',
    spades: '\u2660',
    clubs: '\u2663',
    hearts: '\u2665',
    diams: '\u2666'
};

var JSXTAGS = {
    a: true,
    abbr: true,
    address: true,
    applet: true,
    area: true,
    article: true,
    aside: true,
    audio: true,
    b: true,
    base: true,
    bdi: true,
    bdo: true,
    big: true,
    blockquote: true,
    body: true,
    br: true,
    button: true,
    canvas: true,
    caption: true,
    circle: true,
    cite: true,
    code: true,
    col: true,
    colgroup: true,
    command: true,
    data: true,
    datalist: true,
    dd: true,
    defs: true,
    del: true,
    details: true,
    dfn: true,
    dialog: true,
    div: true,
    dl: true,
    dt: true,
    ellipse: true,
    em: true,
    embed: true,
    fieldset: true,
    figcaption: true,
    figure: true,
    footer: true,
    form: true,
    g: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    head: true,
    header: true,
    hgroup: true,
    hr: true,
    html: true,
    i: true,
    iframe: true,
    img: true,
    input: true,
    ins: true,
    kbd: true,
    keygen: true,
    label: true,
    legend: true,
    li: true,
    line: true,
    linearGradient: true,
    link: true,
    main: true,
    map: true,
    mark: true,
    marquee: true,
    mask: false,
    menu: true,
    menuitem: true,
    meta: true,
    meter: true,
    nav: true,
    noscript: true,
    object: true,
    ol: true,
    optgroup: true,
    option: true,
    output: true,
    p: true,
    param: true,
    path: true,
    pattern: false,
    polygon: true,
    polyline: true,
    pre: true,
    progress: true,
    q: true,
    radialGradient: true,
    rect: true,
    rp: true,
    rt: true,
    ruby: true,
    s: true,
    samp: true,
    script: true,
    section: true,
    select: true,
    small: true,
    source: true,
    span: true,
    stop: true,
    strong: true,
    style: true,
    sub: true,
    summary: true,
    sup: true,
    svg: true,
    table: true,
    tbody: true,
    td: true,
    text: true,
    textarea: true,
    tfoot: true,
    th: true,
    thead: true,
    time: true,
    title: true,
    tr: true,
    track: true,
    tspan: true,
    u: true,
    ul: true,
    'var': true,
    video: true,
    wbr: true
};

var JSXReader = CustomReader.create({
    read: function() {
        var parser = this.parser;
        var Token = parser.Token;

        try {
            var tokens = this.getTokens(this.readElement.bind(this));
        }
        catch(e) {
            if(!(e instanceof JSXBailError)) {
                throw e;
            }
            //console.log(e.message);
            this.reset();
            return this.finish();
        }

        var firstTok = tokens[0];
        var lastTok = tokens[tokens.length - 1];

        this.add(parser.withLoc(parser.index(), {
            type: Token.Identifier,
            value: 'DOM',
        }));

        this.add(parser.withLoc(parser.index(), {
            type: Token.Delimiter,
            value: '{}',
            startLineNumber: firstTok.lineNumber,
            startLineStart: firstTok.lineStart,
            startRange: firstTok.range,
            inner: tokens,
            endLineNumber: lastTok.lineNumber,
            endLineStart: lastTok.lineStart,
            endRange: lastTok.range,
        }));
    },

    readElement: function() {
        function tokReduce(acc, tok) {
            return acc + tok.value;
        }

        var parser = this.parser;
        var Token = parser.Token, selfClosing;
        var openingNameToks = this.inspectTokens(function() {
            selfClosing = this.readOpeningElement();
        }.bind(this));

        // The opening name includes any attributes as the last
        // token, so pull it off
        var openingName = openingNameToks.slice(0, -1)
            .reduce(tokReduce, '');

        if(!selfClosing) {
            while(this.parser.index() < this.parser.length()) {
                if(this.match('<', '/')) {
                    break;
                }

                this.readChild();
            }

            var closingName = this.getTokens(
                this.readClosingElement.bind(this)
            ).reduce(tokReduce, '');
            
            if(openingName !== closingName) {
                throw new JSXReadError(
                    "Expected correspoding closing tag for " + openingName,
                    this.parser
                )
            }
        }

        if(JSXTAGS[openingName]) {
            openingNameToks[0].value = 'React.DOM.' + openingName;
        }
    },

    readOpeningElement: function() {
        var parser = this.parser;
        var selfClosing = false;

        this.expect('<');
        this.readElementName();            
        parser.scanComment();

        var tokens = this.getTokens(function() {
            var end = false;

            while(parser.index() < parser.length() &&
                  !this.match('/') &&
                  !this.match('>')) {
                this.readAttribute();
                end = this.match('/') || this.match('>');
                if(!end) {
                    this.add({
                        type: parser.Token.Punctuator,
                        value: ','
                    });
                }
            }
        }.bind(this));

        if(tokens.length) {
            this.add(parser.withLoc(parser.index(), {
                type: parser.Token.Delimiter,
                value: '{}',
                inner: tokens
            }));
        }
        else {
            this.add({
                type: parser.Token.NullLiteral,
                value: 'null'
            });
        }

        parser.scanComment();
        if(this.match('/')) {
            selfClosing = true;
            this.expect('/');
        }
        this.expect('>');

        return selfClosing;
    },

    readClosingElement: function() {
        this.expect('<');
        this.expect('/');
        this.readElementName();
        this.expect('>');
    },

    readChild: function() {
        if(this.match('{')) {
            this.readExpressionContainer();
        }
        else if(this.match('<')) {
            this.read();
        }
        else {
            this.readText(['{', '<'])
            var tok = this.buffer.pop()
            this.renderLiteral(tok.value);
        }
    },

    renderLiteral: function(str) {
        var lines = str.split(/\r\n|\n|\r/);
        var output = [];

        lines.forEach(function(line, index) {
            var isFirstLine = index === 0;
            var isLastLine = index === lines.length - 1;
            
            // replace rendered whitespace tabs with spaces
            var trimmedLine = line.replace(/\t/g, ' ');

            // trim whitespace touching a newline
            if(!isFirstLine) {
                trimmedLine = trimmedLine.replace(/^[ ]+/, '');
            }
            if(!isLastLine) {
                trimmedLine = trimmedLine.replace(/[ ]+$/, '');
            }

            if(trimmedLine) {
                output.push(trimmedLine);
            }
        });

        var parser = this.parser;
        output.forEach(function(str, i) {
            if(i !== 0) {
                this.add({
                    type: parser.Token.Punctuator,
                    value: '+'
                });
                this.add({
                    type: parser.Token.StringLiteral,
                    value: ' '
                });
                this.add({
                    type: parser.Token.Punctuator,
                    value: '+'
                });
            }
            this.add({
                type: parser.Token.StringLiteral,
                value: str
            });
        }.bind(this));
    },

    readText: function(stopChars) {
        var parser = this.parser;
        var ch, str = '';
        var index = parser.index();
        var source = parser.source();
        var start = index;

        while(index < parser.length()) {
            ch = source[index];
            if(stopChars.indexOf(ch) !== -1) {
                break;
            }

            if(ch === '&') {
                parser.index(index);
                str += this.readEntity(index);
                index = parser.index();
            }
            else {
                index++;
                if(parser.isLineTerminator(ch.charCodeAt(0))) {
                    parser.lineNumber(parser.lineNumber()+1);
                    parser.lineStart(index);
                }
                str += ch;
            }
        }

        parser.index(index);
        this.add(parser.withLoc(start, {
            type: parser.Token.StringLiteral,
            value: str
        }));
    },

    readEntity: function() {
        var parser = this.parser;
        var source = parser.source();
        var index = parser.index();
        var ch = source[index];
        var str = '', count = 0, entity;

        if(ch !== '&') {
            throw new JSXReadError('Entity must start with an ampersand');
        }
        index++;

        while(index < parser.length() && count < 10) {
            ch = source[index++];
            if(ch === ';') {
                break;
            }
            str += ch;
            count++;
        }

        if (str[0] === '#' && str[1] === 'x') {
            entity = String.fromCharCode(parseInt(str.substr(2), 16));
        } else if (str[0] === '#') {
            entity = String.fromCharCode(parseInt(str.substr(1), 10));
        } else {
            entity = XHTMLEntities[str];
        }

        parser.index(index);
        return entity;
    },

    readElementName: function() {
        var parser = this.parser;
        if(!parser.isIdentifierStart(parser.ch().charCodeAt(0))) {
            throw new JSXBailError('bailed while reading element ' +
                                   'name: ' + parser.ch());
        }

        this.readIdentifier();

        if(this.match(':')) {
            this.readPunc();
            this.readIdentifier();
        }
        if(this.match('.')) {
            this.readMemberParts();
        }
    },

    readAttribute: function() {
        var hasValue = false;
        this.readIdentifier();

        if(this.match(':')) {
            this.readPunc();
            this.readIdentifier();
        }

        if((hasValue = this.match('='))) {
            this.expect('=');
        }

        this.add({
            type: this.parser.Token.Punctuator,
            value: ':'
        });

        if(hasValue) {
            this.readAttributeValue();
        }
        else {
            this.add({
                type: this.parser.Token.BooleanLiteral,
                value: 'true'
            });
        }

        this.parser.scanComment();
    },

    readAttributeValue: function() {
        if(this.match('{')) {
            this.readExpressionContainer();
            // TODO
            //throw new Error("can't be empty");
        }
        else if(this.match('<')) {
            this.read();
        }
        else {
            var quote = this.parser.ch();
            var start = this.parser.index();

            if(quote !== '"' && quote !== "'") {
                throw new JSXReadError(
                    'attributes should be an expression or quoted text',
                    this.parser
                );
            }

            this.parser.index(start + 1);
            this.readText([quote]);
            if(quote !== this.parser.source()[this.parser.index()]) {
                throw new JSXReadError(
                    'badly quoted string',
                    this.parser
                );
            }
            this.parser.index(this.parser.index() + 1);
        }
    },

    readExpressionContainer: function() {
        var parser = this.parser;
        this.expect('{');
        this.parser.scanComment();

        while(!this.match('}')) {
            this.readToken();
            this.parser.scanComment();
        }
        
        this.expect('}');
    },

    readMemberParts: function() {
        while(this.match('.')) {
            this.readPunc();
            this.readIdentifier();
        }
    },

    readIdentifier: function() {
        var parser = this.parser;
        parser.scanComment();

        var index = parser.index();
        var source = parser.source();
        var ch, start, value = '';
        var chCode = parser.ch().charCodeAt(0);

        if(chCode === 92 || !parser.isIdentifierStart(chCode)) {
            throw new JSXBailError('bailed while reading identifier: ' +
                                   parser.ch());
        }

        start = index;
        while(index < parser.length()) {
            ch = source.charCodeAt(index);
            // exclude backslash (\) and add hyphen (-)
            if(ch === 92 ||
               !(ch === 45 || parser.isIdentifierPart(ch))) {
                break;
            }
            value += source[index++];
        }

        this.parser.index(index);
        this.add(parser.withLoc(start, {
            type: parser.Token.Identifier,
            value: value
        }));
    }
});

module.exports = {
    '<': function (ch, parser) {
        var reader = new JSXReader(parser);
        reader.read();
        var x = reader.finish();
        if(!x.length) {
            return parser.advance();
        }
        return x;
    }
};
