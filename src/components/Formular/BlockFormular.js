import { Edit, Delete, Upload, Add } from '@mui/icons-material'
import { Box,
    Button,
    FormGroup,
    Switch,
    TextField,
    Select,
    MenuItem,
    Tab,
    Tabs
} from "@mui/material"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { removeBlockNode, setEdges, updateNode } from '../../RTK/slices/nodeSlice';
import { maxChoices } from '../../app.constants';

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
    const [tabValue, setTabValue] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [onscreenChoices, setOnscreenChoices] = useState([]);
    const [onscreenQuestion, setOnscreenQuestion] = useState({});
    const [media, setMedia] = useState('');
    const [focusId, setFocusId ] = useState('');
    const [file, setFile] = useState(null);

    const selectedNode = useSelector((state) => state.RFState.selectedNode);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedNode && selectedNode.data) {
            const {name, description, onscreenChoices, onscreenQuestion, media} = selectedNode.data;
            setName(name);
            setDescription(description);
            setOnscreenChoices(onscreenChoices);
            setOnscreenQuestion(onscreenQuestion);
            setMedia(media);
        }
    }, [selectedNode]);

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
        setOnscreenChoices(x => {
            const updatedList = [...x, {id: `handle-${nanoid()}`, buttonText: ''}];
            setTabValue(updatedList.length - 1);
            return updatedList;
        });
    }

    const onScreenchoiceChange = (e, id) => {
        setOnscreenChoices(onscreenChoices.map(choice => choice.id === id ? {...choice, buttonText: e.target.value}: choice));
    }

    const onDeleteChoice = (id) => {
        setOnscreenChoices(onscreenChoices.filter(choice => choice.id !== id));
    }

    const hanldeMediaUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setMedia({...media, url: videoUrl, name: file.name});
            setFile(file);
        }
    }

    const onDeleteMedia = () => {
        setMedia({...media, url: '', name: ''});
        setFile(null);
    }

    useEffect(() => {
        if (focusId) {
            document.getElementById(`${focusId}`)?.focus();
        }
    }, [focusId , onscreenChoices ]);

    const onUpdateBlock = () => {
        const updatedNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                name,
                description,
                onscreenChoices,
                onscreenQuestion,
                media
            }
        }

        // Update sync with redux store
        dispatch(updateNode(updatedNode));
        dispatch(setEdges())
    }

    const onDeleteBlock = () => {
        dispatch(removeBlockNode(selectedNode.id));
    }

    return (
        <div className='drawer' style={{ transform: isDrawerOpen ? 'translateX(0)' : 'translateX(calc(100% - 6vw))' }}>
            <button className='drawer-toggle-btn'
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    style={{borderColor: isDrawerOpen && '#0074e6'}}
                ><Edit />
            </button>
            {isDrawerOpen &&
            <div className='drawer-form'>
                {selectedNode ?
                    <div className='drawer-sec-wrapper'>
                        <div className='mt-2'>
                            <legend>Block Info</legend>
                            <div className='drawer-section'>
                                <label>Name</label>
                                <TextField className='mt-0-5'
                                        sx={{background: 'white'}}
                                        id="name"
                                        size='small'
                                        variant="outlined"
                                        value={name}
                                        name='name'
                                        onChange={e => setName(e.target.value)}/>
                                <label className='mt-1' >Description</label>
                                <textarea className='mt-0-5 text-area border-1'
                                        placeholder='Description here'
                                        value={description}
                                        name='description'
                                        onChange={e => setDescription(e.target.value)}/>                            
                            </div>
                        </div>
                        
                        <div className='mt-2'>
                            <legend>Onscreen Choices</legend>
                            <div className='drawer-section'>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
                                        {onscreenChoices.map((choice, i) => {
                                            return <Tab key={choice.id} sx={{ textTransform: 'capitalize'}} label={`Choice ${i + 1}`} {...tabProps(i)} />
                                        })}
                                        {onscreenChoices.length < maxChoices && 
                                            <Button sx={{
                                                        textTransform: 'capitalize'
                                                    }}
                                                    startIcon={<Add />}
                                                    onClick={onAddChoice}>
                                                Add Choice
                                            </Button>
                                        }
                                    </Tabs>
                                </Box>
                                
                                {onscreenChoices.map((choice, i) => {
                                    return (
                                        <CustomTabPanel key={i} value={tabValue} index={i}>
                                            <label className='mt-1'>Custom Button Text</label>
                                            <TextField className='mt-0-5'
                                                    sx={{background: 'white'}}
                                                    id={`${choice.id}`}
                                                    size='small'
                                                    variant="outlined"
                                                    value={choice.buttonText}
                                                    onFocus={() => setFocusId(choice.id)}
                                                    onChange={e => onScreenchoiceChange(e, choice.id)}/>
                                            {onscreenChoices.length > 1 &&
                                                <Button size="small"
                                                    variant="text"
                                                    color='error'
                                                    startIcon={<Delete />}
                                                    sx={{ width: '130px', textTransform: 'capitalize' }}
                                                    className='mt-1'
                                                    onClick={() => onDeleteChoice(choice.id)}>
                                                Delete Choice
                                            </Button>}
                                        </CustomTabPanel>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='mt-2'>
                            <legend>Onscreen Question</legend>
                            <div className='drawer-section'>
                                <span>What is your question?</span>
                                <textarea className='mt-0-5 text-area border-1'
                                        value={onscreenQuestion?.question}
                                        name='question'
                                        onChange={e => setOnscreenQuestion(x => ({...x, question: e.target.value}))}/>
                                <FormGroup sx={{width: 'fit-content', display: 'inline-block'}}>
                                    <Switch
                                        checked={onscreenQuestion.hide}
                                        value={onscreenQuestion.hide}
                                        onChange={e => setOnscreenQuestion(x => ({...x, hide: e.target.checked}))}/>
                                    <label>Hide Question</label>
                                </FormGroup>
                            </div>
                        </div>

                        <div className='mt-2'>
                            <legend>Media</legend>
                            <div className='drawer-section'>
                                <label>Media Type</label>
                                <Select
                                    className='mt-0-5'
                                    value={media.type}
                                    onChange={e => {
                                        setMedia(x => ({...x, type: e.target.value, name: '', url: ''}))
                                        setFile(null);
                                    }}
                                    displayEmpty
                                    size='small'
                                    sx={{background: 'white'}}
                                >
                                    <MenuItem value='video'>Video</MenuItem>
                                    <MenuItem value='url'>URL</MenuItem>
                                </Select>
                                {(media.type === 'video' ?
                                    <>
                                        {!media.name
                                        ?
                                        <div className='mt-2 border-1 media-upload-box'>
                                            <Button className='border-1 media-upload-box' sx={{ width: '100%', textTransform: 'capitalize' }} component="label" variant="text" startIcon={<Upload />}>
                                                Upload your video
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={hanldeMediaUpload}/>
                                            </Button>
                                        </div>
                                        :
                                        <div className='mt-2'>{media.name}</div>
                                        }
                                        <Button size="small"
                                                variant="text"
                                                color='error'
                                                startIcon={<Delete />}
                                                sx={{ width: '130px', textTransform: 'capitalize' }}
                                                className='mt-1'
                                                onClick={onDeleteMedia}
                                            >Delete Media
                                        </Button>
                                    </>
                                    : 
                                    <>
                                        <label className='mt-1'>Media Link</label>
                                        <TextField className='mt-0-5'
                                            sx={{background: 'white'}}
                                            id="url" size='small'
                                            variant="outlined"
                                            value={media.url}
                                            onChange={e => setMedia(x => ({...x, url: e.target.value}))}/>
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
                                    onClick={onDeleteBlock}
                                    disabled={selectedNode?.data?.isStartNode}
                                >Delete Block
                            </Button>
                            <Button sx={{ marginTop: '1.5rem' }}
                                    size="medium"
                                    variant="outlined"
                                    onClick={onUpdateBlock}
                                >Update Block
                            </Button>
                        </Box>
                    </div>
                    : <div className='placeholder-text'>Please select a node to update</div>}
            </div>
            }
        </div>
    )
}

export default BlockFormular;