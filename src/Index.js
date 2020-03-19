'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var ApolloLinks = require("reason-apollo/src/ApolloLinks.bs.js");
var ReasonApollo = require("reason-apollo/src/ReasonApollo.bs.js");
var ReactApollo = require("react-apollo");
var ReactHooks = require("@apollo/react-hooks");
var ApolloInMemoryCache = require("reason-apollo/src/ApolloInMemoryCache.bs.js");
var Styles$ReasonReactExamples = require("./Styles.js");
var AuthorQuery$ReasonReactExamples = require("./AuthorQuery.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = Styles$ReasonReactExamples.style;

var inMemoryCache = ApolloInMemoryCache.createInMemoryCache(undefined, undefined, /* () */0);

var httpLink = ApolloLinks.createHttpLink("http://localhost:8000", undefined, undefined, undefined, undefined, undefined, /* () */0);

var client = ReasonApollo.createApolloClient(httpLink, inMemoryCache, undefined, undefined, undefined, undefined, /* () */0);

ReactDOMRe.renderToElementWithId(React.createElement(ReactApollo.ApolloProvider, {
          client: client,
          children: React.createElement(ReactHooks.ApolloProvider, {
                client: client,
                children: React.createElement(AuthorQuery$ReasonReactExamples.make, { })
              })
        }), "root");

exports.style = style;
exports.inMemoryCache = inMemoryCache;
exports.httpLink = httpLink;
exports.client = client;
/* style Not a pure module */
