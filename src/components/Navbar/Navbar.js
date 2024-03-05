import { Box, Button } from "@mui/material"
import { useState } from "react";
import VideoPlayer from "../MediaPlayer/VideoPlayer";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const onExportClick = () => {
        console.log('Video exported.');
    }

    return (
        <>
        {open && <VideoPlayer open={open} handleClose={handleClose}/>}
        <Box height='60px'
            borderBottom="1px solid #d8d8da"
            padding='0 20px'
            display='flex'
            alignItems='center'
            justifyContent='center'>
            <Button
                size="small"
                variant="contained"
                sx={{ marginRight: '50px ' }}
                onClick={handleOpen}
            >Play</Button>
            <Button
                size="small"
                variant="contained"
                onClick={onExportClick}
            >Export</Button>
        </Box>
        </>
    )
}

export default Navbar;