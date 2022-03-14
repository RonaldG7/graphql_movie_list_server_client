import {useMutation} from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import {GET_MOVIES_QUERY} from "../../graphql/movieQueries";
import {DELETE_MOVIE} from "../../graphql/deleteMovieMutation";

const ModalDeleteMovie = ({open, setOpen, id}) => {

    const [deleteMovie, {error}] = useMutation(DELETE_MOVIE)

    const handleClose = () => setOpen(false);

    const handleDeleteMovie = () => {
        deleteMovie({
            variables: {
                id
            },
            refetchQueries: [{query: GET_MOVIES_QUERY}],
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
                    <h3 style={{color: "deeppink"}}>Delete Movie</h3>
                    <p>Are you sure you want to delete this movie?</p>
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleDeleteMovie} variant="outlined"><DeleteIcon /> Delete</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalDeleteMovie;