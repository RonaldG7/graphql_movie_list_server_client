import {gql} from "@apollo/client";

export const GET_MOVIES_QUERY = gql `
    query movies($name: String) {
        movies(name: $name){
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