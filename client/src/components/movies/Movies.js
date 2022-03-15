import {useState} from 'react';
import {useQuery} from "@apollo/client";
import SingleMovie from "./SingleMovie";
import MovieHeader from "./MovieHeader";
import SearchBar from "../SearchBar";
import ModalAddMovie from "./ModalAddMovie";
import {GET_MOVIES_QUERY} from "../../graphql/movieQueries";

const Movies = () => {

    const [search, setSearch] = useState("")

    const {error, loading, data} = useQuery(GET_MOVIES_QUERY, {
        variables: {
            name: search
        },
    })

    function handleSearch(e, searchRef) {
        if (e.charCode === 13 && searchRef.current.value.length === 0) return setSearch("")
        if (e.charCode === 13 && searchRef.current.value.length > 0) return setSearch(searchRef.current.value)
    }

    if (loading) return <div>Loading....</div>
    if (error) return <div>Something went wrong...</div>

    return (
        <div className="movieList">
            <SearchBar handleSearch={handleSearch}/>
            <MovieHeader/>
            {!loading && data.movies.map((x, i) => <SingleMovie movie={x} key={i}/>)}
            <ModalAddMovie/>
        </div>
    );
};

export default Movies;