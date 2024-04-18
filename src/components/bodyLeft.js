import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InfoListTrainLine from './infoListTrainLine';
import DirectionMap from './directionMap';
// import DirectionMapTest from './directMap';


export default function BodyLeft() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className='bodyLeft'>
            <div className='map-info'>
                <TabContext value={value}>
                    <div className='map-control'>
                        <div className='tab-control'>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    <Tab label="Tìm đường" value="1" />
                                    <Tab label="Thông tin trạm" value="2" />
                                </TabList>
                            </Box>
                        </div>
                    </div>
                    <div className='info-container'>
                        {/* <TabPanel value="1"><DirectionMap/></TabPanel> */}
                        <TabPanel value="1"><DirectionMap /></TabPanel>

                        <TabPanel value="2"><InfoListTrainLine /></TabPanel>
                    </div>
                </TabContext>
            </div>
        </div>

    )
}

