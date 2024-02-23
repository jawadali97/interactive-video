import { Box, Button } from "@mui/material"
import { useState } from "react";
import VideoPlayer from "../MediaPlayer/VideoPlayer";

const Navbar = () => {

    const [openPlayer, setOpenPlayer] = useState(false);
    
    const onExportClick = () => {
        console.log('Video exported.');
    }

    return (
        <>
        {openPlayer && <VideoPlayer onClose={() => setOpenPlayer(!openPlayer) }/>}
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
                onClick={() => setOpenPlayer(!openPlayer)}
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