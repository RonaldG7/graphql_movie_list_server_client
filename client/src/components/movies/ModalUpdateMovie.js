import {useRef, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import {UPDATE_MOVIE} from "../../graphql/updateMovieMutation";
import {GET_MOVIES_QUERY} from "../../graphql/movieQueries";
import {GET_DIRECTORS_QUERY} from "../../graphql/directorsQueris";

const ModalUpdateMovie = ({open, setOpen, movieId}) => {

    const nameRef = useRef()
    const genreRef = useRef()
    const rateRef = useRef()
    const watchedRef = useRef()

    const [id, setId] = useState(null)

    const [updateMovie, {error}] = useMutation(UPDATE_MOVIE)
    const {loading, data} = useQuery(GET_DIRECTORS_QUERY, {
        variables: {
            name: ""
        }
    })

    const handleClose = () => setOpen(false)

    const [anchorEl, setAnchorEl] = useState(null)
    const open2 = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose2 = (id) => {
        setId(id)
        setAnchorEl(null)
    }

    function saveMovie () {
        updateMovie({
            variables: {
                id: movieId,
                name: nameRef.current.value,
                genre: genreRef.current.value,
                rate: Number(rateRef.current.value),
                watched: watchedRef.current.checked,
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="addDirectorModal">
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField style={{color: "white"}} fullWidth label="Name" id="fullWidth" />
                    </Box>
                    <input ref={nameRef} type="text" placeholder="Name"/>
                    <input ref={genreRef} type="text" placeholder="Genre"/>
                    <input ref={rateRef} type="number" placeholder="Rating"/>
                    <input ref={watchedRef} type="checkbox"/>
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

export default ModalUpdateMovie;