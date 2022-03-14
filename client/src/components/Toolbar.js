import React, {useState} from 'react';
import {Movie, Camera} from "@mui/icons-material";
import {useNavigate} from "react-router-dom"

const Toolbar = () => {

    const [moviesPage, setMoviesPage] = useState(true)
    const [directorsPage, setDirectorsPage] = useState(false)
    const nav = useNavigate()

    function handleMoviesClick () {
        setMoviesPage(true)
        setDirectorsPage(false)
        nav("/")
    }

    function handleDirectorsClick () {
        setMoviesPage(false)
        setDirectorsPage(true)
        nav("/directors")
    }

    return (
        <div className="toolbar d-flex">
            <div onClick={handleMoviesClick} className={ moviesPage ?
                "d-flex a-center column border" :
                "d-flex a-center column"}>
                <Camera
                    fontSize="inherit"
                    style={{ fontSize: "50px" }}
                />
                <p>MOVIES</p>
            </div>
            <div onClick={handleDirectorsClick} className={ directorsPage ?
                "d-flex a-center column border" :
                "d-flex a-center column"}>
                <Movie
                    fontSize="inherit"
                    style={{ fontSize: "50px" }}
                />
                <p>DIRECTORS</p>
            </div>
        </div>
    );
};

export default Toolbar;