'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

var ppx_printed_query = "query authorByName($name: String!)  {\nauthor(name: $name)  {\nname  \nbooks  {\ntitle  \n}\n\n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "author");
  var tmp;
  if (match !== undefined) {
    var value$2 = Js_option.getExn(Js_json.decodeObject(Caml_option.valFromOption(match)));
    var match$1 = Js_dict.get(value$2, "name");
    var tmp$1;
    if (match$1 !== undefined) {
      var value$3 = Caml_option.valFromOption(match$1);
      var match$2 = Js_json.decodeString(value$3);
      tmp$1 = match$2 !== undefined ? match$2 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
    } else {
      tmp$1 = Js_exn.raiseError("graphql_ppx: Field name on type Author is missing");
    }
    var match$3 = Js_dict.get(value$2, "books");
    var tmp$2;
    if (match$3 !== undefined) {
      var value$4 = Caml_option.valFromOption(match$3);
      var match$4 = Js_json.decodeNull(value$4);
      tmp$2 = match$4 !== undefined ? undefined : Js_option.getExn(Js_json.decodeArray(value$4)).map((function (value) {
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
      tmp$2 = undefined;
    }
    tmp = {
      name: tmp$1,
      books: tmp$2
    };
  } else {
    tmp = Js_exn.raiseError("graphql_ppx: Field author on type Query is missing");
  }
  return {
          author: tmp
        };
}

function make(name, param) {
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray([/* tuple */[
                    "name",
                    name
                  ]].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeWithVariables(variables) {
  var name = variables.name;
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray([/* tuple */[
                    "name",
                    name
                  ]].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeVariables(name, param) {
  return Js_dict.fromArray([/* tuple */[
                  "name",
                  name
                ]].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function definition_002(graphql_ppx_use_json_variables_fn, name, param) {
  return Curry._1(graphql_ppx_use_json_variables_fn, Js_dict.fromArray([/* tuple */[
                      "name",
                      name
                    ]].filter((function (param) {
                        return !Js_json.test(param[1], /* Null */5);
                      }))));
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

var GetAuthorByName = {
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

function AuthorQuery(Props) {
  var author = make("nde", /* () */0);
  var match = ApolloHooks.useQuery(undefined, Caml_option.some(author.variables), undefined, undefined, undefined, undefined, undefined, definition);
  var simple = match[0];
  var tmp;
  if (typeof simple === "number") {
    tmp = simple === /* Loading */0 ? React.createElement("p", undefined, "Loading...") : React.createElement("p", undefined, "Empty response :S");
  } else if (simple.tag) {
    tmp = React.createElement("p", undefined, simple[0].message);
  } else {
    var data = simple[0];
    var match$1 = data.author.books;
    tmp = React.createElement("div", undefined, React.createElement("h1", undefined, data.author.name), match$1 !== undefined ? match$1.map((function (book) {
                  return React.createElement("p", undefined, book.title);
                })) : React.createElement("p", undefined, "This author has no books!"));
  }
  return React.createElement("div", undefined, tmp);
}

var make$1 = AuthorQuery;

exports.GetAuthorByName = GetAuthorByName;
exports.make = make$1;
/* react Not a pure module */
