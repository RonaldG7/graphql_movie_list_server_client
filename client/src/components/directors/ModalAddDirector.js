import React, {useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useMutation} from "@apollo/client";
import {SAVE_DIRECTOR} from "../../graphql/addDirectorMutation";
import {GET_DIRECTORS_QUERY} from "../../graphql/directorsQueris"


const ModalAddDirector = () => {

    const nameRef = useRef()
    const ageRef = useRef()

    const [addDirector, {loading, error}] = useMutation(SAVE_DIRECTOR)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function saveDirector () {
        addDirector({
            variables: {
                name: nameRef.current.value,
                age: Number(ageRef.current.value)
            },
            refetchQueries: [{query: GET_DIRECTORS_QUERY, variables: {name: ""}}],
        })
        setOpen(false)
    }

    if (error) return <div>Something went wrong...</div>
    if (loading) return <div>Loading....</div>

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
                    <input ref={ageRef} type="number" placeholder="Age"/>
                    <button onClick={saveDirector}>Save</button>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalAddDirector;