open ApolloHooks;

type variables = {name: string};

module GetAuthorByName = [%graphql
  {|
    query authorByName ($name: String!) {
      author (name: $name) {
        name
        books {
          title
        }
      }
    }
   |}
];

[@react.component]
let make = () => {
  let author = GetAuthorByName.make(~name="nde", ());
  let (simple, _full) =
    useQuery(~variables=author##variables, GetAuthorByName.definition);

  <div>
    {switch (simple) {
     | Loading => <p> {React.string("Loading...")} </p>
     | Data(data) =>
       <div>
         <h1> {React.string(data##author##name)} </h1>
         {switch (data##author##books) {
          | Some(books) =>
            <p>
              {React.string(
                 books
                 ->Js.Array2.map(book => book##title)
                 ->Js.Array2.joinWith(","),
               )}
            </p>
          | None => <p> {React.string("This author has no books!")} </p>
          }}
       </div>
     | NoData => <p> {React.string("Empty response :S")} </p>
     | Error(err) => <p> {React.string(err##message)} </p>
     }}
  </div>;
};