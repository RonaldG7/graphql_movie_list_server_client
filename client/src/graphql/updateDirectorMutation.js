import {gql} from "@apollo/client";

export const UPDATE_DIRECTOR = gql`
    mutation updateDirector($id: ID!, $name: String!, $age: Int!) {
        updateDirector(id: $id, name: $name, age: $age) {
            name
        }
    }
`