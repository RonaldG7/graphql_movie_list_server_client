import {gql} from "@apollo/client";

export const GET_MOVIES_QUERY = gql `
    query MoviesQuery {
        movies{
            id
            name
            genre
            watched
            rate
            director {
                id
                name
            }
        }
    }
`