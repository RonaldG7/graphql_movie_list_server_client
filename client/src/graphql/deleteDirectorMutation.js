import {gql} from "@apollo/client";

export const DELETE_DIRECTOR = gql`
    mutation deleteDirector($id: ID) {
        deleteDirector(id: $id) {
            id
        }
    }
`