
import { Box, Paper } from '@mui/material';
import Flow from './Flow';

const Canvas = () => {
    return (
        <Box sx={{ height: '100%', overflow: 'hidden' }}>
            <Paper sx={{
                backgroundColor: '#f8f9fc',
                overflow: "auto",
                height: '100%',
                borderRadius: 0,
                cursor: 'move',
                paddingBottom: '50px'
            }} >
                <Flow />
            </Paper>
        </Box>
    )
}

export default Canvas;