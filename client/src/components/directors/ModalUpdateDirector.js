import React, {useRef} from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {useMutation} from "@apollo/client";
import {UPDATE_DIRECTOR} from "../../graphql/updateDirectorMutation";
import {GET_DIRECTORS_QUERY} from "../../graphql/directorsQueris";

const ModalUpdateDirector = ({open, setOpen, directorId}) => {

    const [updateDirector, {error}] = useMutation(UPDATE_DIRECTOR)

    const nameRef = useRef()
    const ageRef = useRef()

    const handleClose = () => setOpen(false);

    const handleUpdateDirector = () => {
        updateDirector({
            variables: {
                id: directorId,
                name: nameRef.current.value,
                age: Number(ageRef.current.value),
            },
            refetchQueries: [{query: GET_DIRECTORS_QUERY}],
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
                    <input ref={nameRef} type="text" placeholder="Name"/>
                    <input ref={ageRef} type="number" placeholder="Age"/>
                    <button onClick={handleUpdateDirector}>Save</button>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalUpdateDirector;