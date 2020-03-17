'use strict';

var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

var ppx_printed_query = "query BooksQuery  {\nbooks  {\ntitle  \n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "books");
  var tmp;
  if (match !== undefined) {
    var value$2 = Caml_option.valFromOption(match);
    var match$1 = Js_json.decodeNull(value$2);
    tmp = match$1 !== undefined ? undefined : Js_option.getExn(Js_json.decodeArray(value$2)).map((function (value) {
              var value$1 = Js_option.getExn(Js_json.decodeObject(value));
              var match = Js_dict.get(value$1, "title");
              var tmp;
              if (match !== undefined) {
                var value$2 = Caml_option.valFromOption(match);
                var match$1 = Js_json.decodeString(value$2);
                tmp = match$1 !== undefined ? match$1 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$2));
              } else {
                tmp = Js_exn.raiseError("graphql_ppx: Field title on type Book is missing");
              }
              return {
                      title: tmp
                    };
            }));
  } else {
    tmp = undefined;
  }
  return {
          books: tmp
        };
}

function make(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeWithVariables(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeVariables(param) {
  return null;
}

function definition_002(graphql_ppx_use_json_variables_fn) {
  return 0;
}

var definition = /* tuple */[
  parse,
  ppx_printed_query,
  definition_002
];

function ret_type(f) {
  return { };
}

var MT_Ret = { };

var UserQuery = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  make: make,
  makeWithVariables: makeWithVariables,
  makeVariables: makeVariables,
  definition: definition,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

function GraphQLAuthorQuery(Props) {
  var match = ApolloHooks.useQuery(undefined, undefined, undefined, undefined, undefined, undefined, undefined, definition);
  var simple = match[0];
  var tmp;
  if (typeof simple === "number") {
    tmp = simple === /* Loading */0 ? React.createElement("p", undefined, "Loading...") : React.createElement("p", undefined, "Get off my lawn!");
  } else if (simple.tag) {
    tmp = React.createElement("p", undefined, "Get off my lawn!");
  } else {
    var match$1 = simple[0].books;
    if (match$1 !== undefined) {
      React.createElement("p", undefined, match$1.map((function (book) {
                    return book.title;
                  })).join(","));
    } else {
      React.createElement("p", undefined, "Get off my lawn!");
    }
    tmp = null;
  }
  return React.createElement("div", undefined, tmp);
}

var make$1 = GraphQLAuthorQuery;

exports.UserQuery = UserQuery;
exports.make = make$1;
/* react Not a pure module */
