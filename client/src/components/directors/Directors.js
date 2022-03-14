import React from 'react';
import SingleDirector from "./SingleDirector";
import DirectorHeader from "./DirectorHeader";
import {useQuery} from "@apollo/client";
import {GET_DIRECTORS_QUERY} from "../../graphql/directorsQueris";
import SearchBar from "../SearchBar";
import ModalAddDirector from "./ModalAddDirector";
const Directors = () => {

    const {error, loading, data} = useQuery(GET_DIRECTORS_QUERY)

    if (error) return <div>error...</div>
    if (loading) return <div>spinner....</div>

    return (
        <div className="directorList">
            <SearchBar/>
            <DirectorHeader/>
            {!loading && data.directors.map((x, i) => <SingleDirector director={x} key={i} />)}
            <ModalAddDirector />
        </div>
    );
};

export default Directors;