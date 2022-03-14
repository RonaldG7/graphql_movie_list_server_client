import {gql} from "@apollo/client";

export const UPDATE_MOVIE = gql`
    mutation updateMovie($id: ID!, $name: String!, $genre: String!, $watched: Boolean!, $rate: Int, $directorId: ID) {
        updateMovie(id: $id, name: $name, genre: $genre, watched: $watched, rate: $rate, directorId: $directorId) {
            name
        }
    }
`