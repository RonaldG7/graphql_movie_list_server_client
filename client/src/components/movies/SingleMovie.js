import {useState} from 'react';
import {grey} from '@mui/material/colors';
import {IconButton} from "@mui/material";
import {MoreVert, Edit, Delete} from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ModalUpdateMovie from "./ModalUpdateMovie";
import ModalDeleteMovie from "./ModalDeleteMovie";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

const SingleMovie = ({movie}) => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleCloseMenuDelete = () => {
        setOpenDeleteModal(true)
        setAnchorEl(null)
    }

    const handleCloseMenuEdit = () => {
        setOpenUpdateModal(true)
        setAnchorEl(null)
    }

    return (
        <div className="singleMovie s-btw">
            <div className="w30">
                <p>{movie.name}</p>
            </div>
            <div className="w20">
                <p>{movie.genre}</p>
            </div>
            <div className="w10">
                <p>{movie.rate}</p>
            </div>
            <div className="w20">
                <p>{movie.director.name}</p>
            </div>
            <div className="w10">
                {movie.watched ? <Checkbox {...label} disabled checked sx={{
                        color: grey[800],
                        '&.Mui-checked': {
                            color: grey[600],
                        },
                    }}/> :
                    <Checkbox {...label} disabled/>}
            </div>
            <div className="w10">
                <IconButton
                    size="large"
                    aria-label="display more actions"
                    edge="end"
                    color="inherit"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVert/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem sx={{color: "white"}} onClick={handleCloseMenuEdit}>Edit <Edit/></MenuItem>
                    <MenuItem sx={{color: "white"}} onClick={handleCloseMenuDelete}>Delete <Delete/></MenuItem>
                </Menu>
            </div>
            <ModalUpdateMovie open={openUpdateModal} setOpen={setOpenUpdateModal} movieId={movie.id} />
            <ModalDeleteMovie open={openDeleteModal} setOpen={setOpenDeleteModal} id={movie.id}/>
        </div>
    );
};

export default SingleMovie;