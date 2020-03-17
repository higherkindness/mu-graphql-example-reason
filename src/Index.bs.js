'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var ApolloLinks = require("reason-apollo/src/ApolloLinks.bs.js");
var ReasonApollo = require("reason-apollo/src/ReasonApollo.bs.js");
var ReactApollo = require("react-apollo");
var ReactHooks = require("@apollo/react-hooks");
var ApolloInMemoryCache = require("reason-apollo/src/ApolloInMemoryCache.bs.js");
var ExampleStyles$ReasonReactExamples = require("./ExampleStyles.bs.js");
var GraphQLAuthorQuery$ReasonReactExamples = require("./GraphQLAuthorQuery.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$ReasonReactExamples.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

var inMemoryCache = ApolloInMemoryCache.createInMemoryCache(undefined, undefined, /* () */0);

var httpLink = ApolloLinks.createHttpLink("http://localhost:8080", undefined, undefined, undefined, undefined, undefined, /* () */0);

var client = ReasonApollo.createApolloClient(httpLink, inMemoryCache, undefined, undefined, undefined, undefined, /* () */0);

var app = React.createElement(ReactHooks.ApolloProvider, {
      client: client,
      children: React.createElement(GraphQLAuthorQuery$ReasonReactExamples.make, { })
    });

ReactDom.render(React.createElement(ReactApollo.ApolloProvider, {
          client: client,
          children: app
        }), makeContainer("GraphQL"));

exports.style = style;
exports.makeContainer = makeContainer;
exports.inMemoryCache = inMemoryCache;
exports.httpLink = httpLink;
exports.client = client;
exports.app = app;
/* style Not a pure module */
