import {gql} from "@apollo/client";

export const DELETE_MOVIE = gql`
    mutation deleteMovie($id: ID) {
        deleteMovie(id: $id) {
            id
        }
    }
`