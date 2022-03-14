import React, {useState} from 'react';
import {IconButton} from "@mui/material";
import {Delete, Edit, MoreVert} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ModalUpdateDirector from "./ModalUpdateDirector";
import ModalDeleteDirector from "./ModalDeleteDirector";

const SingleDirector = ({director}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    // Delete Modal

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    function handleOpenDelete () {
        setOpenDeleteModal(true)
        setAnchorEl(null)
    }

    // Edit Modal
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    function handleOpenEdit () {
        setOpenUpdateModal(true)
        setAnchorEl(null)
    }

    return (
        <div className="singleDirector">
            <div className="w40">
                <p>{director.name}</p>
            </div>
            <div className="w10">
                <p>{director.age}</p>
            </div>
            <div className="w40">
                <ol>
                    {director.movies.map((x, i) => <li key={i}>
                        {x.name}
                    </li>)}
                </ol>
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
                    <MoreVert />
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
                    <MenuItem sx={{color: "white"}} onClick={handleOpenEdit}>Edit <Edit/></MenuItem>
                    <MenuItem sx={{color: "white"}} onClick={handleOpenDelete}>Delete <Delete/></MenuItem>
                </Menu>
            </div>
            <ModalUpdateDirector setOpen={setOpenUpdateModal} open={openUpdateModal} directorId={director.id} />
            <ModalDeleteDirector setOpen={setOpenDeleteModal} open={openDeleteModal} id={director.id} />
        </div>
    );
};

export default SingleDirector;