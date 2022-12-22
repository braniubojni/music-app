import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Navbar from '../components/Navbar';
import MainLayout from '../layouts/MainLayout';

const Index = () => {
  return (
    <>
      <MainLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Navbar />
          <h1 style={{ marginTop: 0 }}>Main Page</h1>
          <Typography>Here you can find the best tracks</Typography>
        </Box>
      </MainLayout>
    </>
  );
};

export default Index;
