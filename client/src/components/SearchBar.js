import {useRef} from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import {Search} from "@mui/icons-material";

const SearchBar = ({handleSearch, handleSearchDirector}) => {

    const searchRef = useRef()

    return (
        <div>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel sx={{ color: "white"}} htmlFor="filled-adornment-amount">Search here...</InputLabel>
                <FilledInput
                    sx={{color: "white", borderColor: "white"}}
                    id="filled-adornment-amount"
                    inputRef={searchRef}
                    onKeyPress={(e) => {
                        handleSearch(e, searchRef)
                        // handleSearchDirector(e, searchRef)
                    }}
                    startAdornment={<InputAdornment position="start">
                        <Search sx={{color: "white"}}/>
                    </InputAdornment>}
                />
            </FormControl>
        </div>
    );
};

export default SearchBar;