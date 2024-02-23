
import { Box, Paper } from '@mui/material';
import Flow from './Flow';
import BlockFormular from '../Formular/BlockFormular';
import { ReactFlowProvider } from 'reactflow';

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
                }}>
                <ReactFlowProvider>
                    <Flow />
                    <BlockFormular/>
                </ReactFlowProvider>                
            </Paper>
        </Box>
    )
}

export default Canvas;