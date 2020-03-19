open ApolloHooks;

module UserQuery = [%graphql
  {|
  query BooksQuery {
    books {
      title
    }
  }
|}
];

[@react.component]
let make = () => {
  /* Both variant and records available */
  let (simple, _full) = useQuery(UserQuery.definition);

  <div>
    {switch (simple) {
     | Loading => <p> {React.string("Loading...")} </p>
     | Data(data) =>
       switch (data##books) {
       | Some(books) =>
         <p>
           {React.string(
              books
              ->Js.Array2.map(book => book##title)
              ->Js.Array2.joinWith(","),
            )}
         </p>
       | None => <p> {React.string("Get off my lawn!")} </p>
       };
       React.null;
     | _ => <p> {React.string("Get off my lawn!")} </p>
     }}
  </div>;
};
/* module GetAuthorByName = [%graphql */
/* {| */
       /* query authorByName ($name: String!) { */
         /* author (name: $name) { */
           /* name */
           /* books { */
             /* title */
           /* } */
         /* } */
       /* } */
   /* |} */
/* ]; */

/* module GetAuthorNameQuery = ReasonApollo.CreateQuery(GetAuthorByName); */

/*
 [@react.component]
 let make = _children => {
   render: _ => {
     let authorNameQuery = GetAuthorByName.make(~name="nde", ());
     <div
       style={ReactDOMRe.Style.make(
         ~display="flex",
         ~alignItems="center",
         ~justifyContent="space-between",
         (),
       )}>
       <GetAuthorNameQuery variables=authorNameQuery##variables>
         ...{({result}) =>
           switch (result) {
           | Loading => <div> {ReasonReact.string("Loading...")} </div>
           | Error(error) => <div> {ReasonReact.string(error##message)} </div>
           | Data(response) =>
             <div>
               {response##author
                ->Belt.Option.flatMap(author => author##books)
                ->Belt.Option.mapWithDefault("", book => book##title)}
             </div>
           }
         }
       </GetAuthorNameQuery>
     </div>;
   },
 };
 */