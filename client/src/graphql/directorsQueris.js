import {gql} from "@apollo/client";

export const GET_DIRECTORS_QUERY = gql `
    query DirectorsQuery {
        directors {
            id
            name
            age
            movies {
                id
                name
            }
        }
    }
`