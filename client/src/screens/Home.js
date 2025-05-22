import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ContentTable from '../components/ContentTable'
import { Box, Typography } from '@mui/material'
import { getDataFromLocal } from '../heplers/storeData/localStrorageData'
const userKey = process.env.REACT_APP_SET_AUTH_DATA;

const Home = () => {
  const [userName, setUserName] = useState(getDataFromLocal(userKey));

  useEffect(() => {
    if (userName) {
      setUserName(`${userName.first_name} ${userName.last_name}`);
    }
  }, []);

  return (
    <div>
        <Navbar />
        <Box sx={{ padding: '2rem', textAlign: 'left' }}>
        <Typography variant="h5" fontWeight="bold">
          {userName ? `Welcome, ${userName}!` : 'Welcome !'}
        </Typography>
      </Box>
        <ContentTable />
    </div>
  )
}

export default Home