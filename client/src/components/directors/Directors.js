import React, {useState} from 'react';
import SingleDirector from "./SingleDirector";
import DirectorHeader from "./DirectorHeader";
import {useQuery} from "@apollo/client";
import {GET_DIRECTORS_QUERY} from "../../graphql/directorsQueris";
import SearchBar from "../SearchBar";
import ModalAddDirector from "./ModalAddDirector";
const Directors = () => {

    const [search, setSearch] = useState("")

    const {error, loading, data} = useQuery(GET_DIRECTORS_QUERY, {
        variables: {
            name: search,
        }
    })

    function handleSearch(e, searchRef) {
        if (e.charCode === 13 && searchRef.current.value.length === 0) return setSearch("")
        if (e.charCode === 13 && searchRef.current.value.length > 0) return setSearch(searchRef.current.value)
    }
    console.log(data)
    if (loading) return <div>spinner....</div>
    if (error) return <div>{"Something went wrong... "+ error.message}</div>

    return (
        <div className="directorList">
            <SearchBar handleSearch={handleSearch} />
            <DirectorHeader/>
            {!loading && data.directors.map((x, i) => <SingleDirector director={x} key={i} />)}
            <ModalAddDirector />
        </div>
    );
};

export default Directors;