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

module GetAuthorNameQuery = ReasonApollo.CreateQuery(GetAuthorByName);

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