import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Home from '../components/Home';
import Login from '@mui/icons-material/Login';
import ScrollToTopButton from '~/components/ScrollToTopButton';

const IndexPage = ({ data, selectedKey, setSelectedKey }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <Box className="p-2">
        <Home data={data} setSelectedKey={setSelectedKey} />
        <ScrollToTopButton />
      </Box>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center  min-h-[93.3vh] bg-gradient-to-br from-green-400 to-blue-500">
      <div className="text-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Swarthmore A11yGator</h1>
        <p className="mb-4">Your hub for accessing remediated, accessible course documents at Swarthmore College.</p>
        <p className="mb-6">Find accessible notes and materials, and enjoy reading in light or dark mode, enhancing your learning experience.</p>
        <Button variant="contained" onClick={() => signIn('google')} className="bg-white text-blue-500 hover:bg-gray-100 rounded-md" >
          <Login className="mr-2" />
          Log In To Access
        </Button>
      </div>
      
      <Image src="https://moodle.swarthmore.edu/pluginfile.php/1/core_admin/logocompact/300x300/1710914295/logo.png" alt="Swarthmore Logo" width={200} height={100} className="my-4" />
      <div className="mt-6">
        {data.length === 0 && (
          <Typography variant="h5" component="h2" className="text-white">
            No course documents available at the moment.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
