import {gql} from "@apollo/client";

export const GET_DIRECTORS_QUERY = gql `
    query directors($name: String) {
        directors(name: $name) {
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