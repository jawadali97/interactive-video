import { Edit, Delete, Upload, Add } from '@mui/icons-material'
import { Box,
    Button,
    FormGroup,
    FormControlLabel,
    Switch,
    TextField,
    Select,
    MenuItem,
    Tab,
    Tabs
} from "@mui/material"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

function BlockFormular() {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
        background: 'red'
    });
    const [mediaType, setMediaType] = useState('video');
    const [tabValue, setTabValue] = useState(0);
    const [numOfChoices, setNumOfChoices] = useState(2);
    const [choices, setChoices] = useState([1, 2]);
    const [formularData, setFormularData] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 2, display: 'grid' }}>
                {children}
              </Box>
            )}
          </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function tabProps(index) {
        return {
          id: `tab-${index}`,
          'aria-controls': `tabpanel-${index}`,
        };
    }

    const onAddChoice = () => {
        setChoices(x => [...x, 2]);
    }

    return (
        <div className='drawer' style={{ transform: isDrawerOpen ? 'translateX(0)' : 'translateX(calc(100% - 6vw))' }}>
            <button className='drawer-toggle-btn'
                    onClick={toggleDrawer}
                    style={{borderColor: isDrawerOpen && '#0074e6'}}
                ><Edit />
            </button>
            {isDrawerOpen &&
            <div className='drawer-form'>
                <div className='drawer-sec-wrapper'>
                    <div className='mt-2'>
                        <legend>Block Info</legend>
                        <div className='drawer-section'>
                            <label>Name</label>
                            <TextField className='mt-0-5' sx={{background: 'white'}} id="name" size='small' variant="outlined" />
                            <label className='mt-1' >Description</label>
                            <textarea className='mt-0-5 text-area border-1' placeholder='Description here'/>                            
                        </div>
                    </div>
                    
                    <div className='mt-2'>
                        <legend>Onscreen Choices</legend>
                        <div className='drawer-section'>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
                                    {choices.map((choice, i) => {
                                        return <Tab sx={{ textTransform: 'capitalize'}} label={`Choice ${i + 1}`} {...tabProps(i)} />
                                    })}
                                    {choices.length < 4 && 
                                        <Button sx={{
                                                textTransform: 'capitalize'
                                            }}
                                            startIcon={<Add />}
                                            onClick={onAddChoice}
                                        >Add Choice
                                        </Button>
                                    }
                                </Tabs>
                            </Box>
                            
                            {choices.map((choice, i) => {
                                return (
                                    <CustomTabPanel value={tabValue} index={i}>
                                        <label className='mt-1'>Custom Button Text</label>
                                        <TextField className='mt-0-5' sx={{background: 'white'}} id="url" size='small' variant="outlined" />
                                    </CustomTabPanel>
                                )
                            })}

                            <Button size="small"
                                    variant="text"
                                    color='error'
                                    startIcon={<Delete />}
                                    sx={{ width: '130px', textTransform: 'capitalize' }}
                                    className='mt-1'
                                >Delete Choice
                            </Button>
                        </div>
                    </div>

                    <div className='mt-2'>
                        <legend>Onscreen Question</legend>
                        <div className='drawer-section'>
                            <span>What is your question?</span>
                            <textarea className='mt-0-5 text-area border-1'/>
                            <FormGroup>
                                <FormControlLabel control={<Switch />} label="Hide Question" />
                            </FormGroup>
                        </div>
                    </div>

                    <div className='mt-2'>
                        <legend>Media</legend>
                        <div className='drawer-section'>
                            <label>Media Type</label>
                            <Select
                                className='mt-0-5'
                                value={mediaType}
                                onChange={(e) => setMediaType(e.target.value)}
                                displayEmpty
                                size='small'
                                sx={{background: 'white'}}
                            >
                                <MenuItem value='video'>Video</MenuItem>
                                <MenuItem value='url'>URL</MenuItem>
                            </Select>
                            {(mediaType === 'video' ?
                                <>
                                    <div className='mt-2 border-1 media-upload-box'>
                                        <Button className='border-1 media-upload-box' sx={{ width: '100%', textTransform: 'capitalize' }} component="label" variant="text" startIcon={<Upload />}>
                                            Upload your video
                                            <VisuallyHiddenInput type="file" accept="video/*" />
                                        </Button>
                                    </div>
                                    <Button size="small"
                                            variant="text"
                                            color='error'
                                            startIcon={<Delete />}
                                            sx={{ width: '130px', textTransform: 'capitalize' }}
                                            className='mt-1'
                                        >Delete Media
                                    </Button>
                                </>
                                : 
                                <>
                                    <label className='mt-1'>Media Link</label>
                                    <TextField className='mt-0-5' sx={{background: 'white'}} id="url" size='small' variant="outlined" />
                                </>)
                            }
                        </div>
                    </div>

                    <Box sx={{
                        margin: '4rem 0',
                        padding: '0px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Button size="medium"
                                variant="outlined"
                                color='error'
                                startIcon={<Delete />}
                            >Delete Block
                        </Button>
                        <Button sx={{ marginTop: '1.5rem' }}
                                size="medium"
                                variant="outlined"
                            >Update Block
                        </Button>
                    </Box>
                </div>
            </div>
            }
        </div>
    )
}

export default BlockFormular;