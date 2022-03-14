import {useMutation} from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import {DELETE_DIRECTOR} from "../../graphql/deleteDirectorMutation";
import {GET_DIRECTORS_QUERY} from "../../graphql/directorsQueris";

const ModalDeleteDirector = ({open, setOpen, id}) => {

    const [deleteDirector, {loading, error}] = useMutation(DELETE_DIRECTOR)
    const handleCloseDeleteModal = () => setOpen(false);

    const handleDeleteDirector = () => {
        deleteDirector({
            variables: {
                id
            },
            refetchQueries: [{query: GET_DIRECTORS_QUERY}],
        })
        setOpen(false)
    }

    if (error) return <div>Something went wrong...</div>
    if (loading) return <div>Loading....</div>

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="addDirectorModal">
                    <h3 style={{color: "deeppink"}}>Delete Movie</h3>
                    <p>Are you sure you want to delete this movie?</p>
                    <Button onClick={handleCloseDeleteModal} variant="outlined">Cancel</Button>
                    <Button onClick={handleDeleteDirector} variant="outlined"><DeleteIcon /> Delete</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalDeleteDirector;