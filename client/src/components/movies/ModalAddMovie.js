import {useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useMutation, useQuery} from "@apollo/client";
import {SAVE_MOVIE} from "../../graphql/addMovieMutation";
import {GET_MOVIES_QUERY} from "../../graphql/movieQueries";
import {GET_DIRECTORS_QUERY} from "../../graphql/directorsQueris";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ModalAddMovie = () => {

    const nameRef = useRef()
    const genreRef = useRef()
    const rateRef = useRef()
    const [getWatched, setWatched] = useState(false)
    const [id, setId] = useState(null)

    const [addMovie, {error}] = useMutation(SAVE_MOVIE)
    const {loading, data} = useQuery(GET_DIRECTORS_QUERY, {
        variables: {
            name: ""
        }
    })

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [anchorEl, setAnchorEl] = useState(null)
    const open2 = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose2 = (id) => {
        setId(id)
        setAnchorEl(null)
    };

    function saveMovie () {
        addMovie({
            variables: {
                name: nameRef.current.value,
                genre: genreRef.current.value,
                rate: Number(rateRef.current.value),
                watched: getWatched,
                directorId: id,
            },
            refetchQueries: [{query: GET_MOVIES_QUERY, variables: {name: ""}}],
        })
        if (error) {
            console.log(error.message)
        }
        setOpen(false)
    }

    return (
        <div>
            <div className="addIcon">
                <Fab color="secondary" aria-label="add">
                    <AddIcon onClick={handleOpen} />
                </Fab>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="addDirectorModal">
                    <input ref={nameRef} type="text" placeholder="Name"/>
                    <input ref={genreRef} type="text" placeholder="Genre"/>
                    <input ref={rateRef} type="number" placeholder="Rating"/>
                    <input onClick={() => setWatched(!getWatched)} type="checkbox"/>
                    <Button
                        sx={{color: "deeppink"}}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Please choose movie Director
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open2}
                        onClose={handleClose2}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {!loading && data?.directors.map((x, i) => <MenuItem sx={{color: "white"}} key={i} onClick={() => handleClose2(x.id)}>{x.name}</MenuItem>)}
                    </Menu>
                    <button onClick={saveMovie}>Save</button>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalAddMovie;