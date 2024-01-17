import { Box, Button } from "@mui/material"

const Navbar = () => {
    return (
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
            >Play</Button>
            <Button size="small" variant="contained">Export</Button>
        </Box>
    )
}

export default Navbar;