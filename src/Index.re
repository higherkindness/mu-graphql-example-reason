[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);
style##innerHTML #= Styles.style;

let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();
let httpLink = ApolloLinks.createHttpLink(~uri="http://localhost:8000", ());
let client =
  ReasonApollo.createApolloClient(~link=httpLink, ~cache=inMemoryCache, ());

ReactDOMRe.renderToElementWithId(
  <ReasonApollo.Provider client>
    <ApolloHooks.Provider client>
      <GraphQLAuthorQuery />
    </ApolloHooks.Provider>
  </ReasonApollo.Provider>,
  "root",
);