import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from '../components/Navbar';
import Link from '@mui/material/Link';


const Profile = () => {
  
  const [user, setUser] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      
    };

    fetchUserData();
  });

  return (
    <>
      <Navbar />
      <div className="mt-4 mx-16">
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              sx={{ width: 150, height: 150 }}
              alt={user ? user.displayName : ''}
              src={user ? user.photoURL : 'https://source.unsplash.com/200x200/?profile pic'}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4">
              Name: {user ? user.name : 'Loading...'}
            </Typography>
            <Typography variant="body1">Email: {user ? user.email : 'Loading...'}</Typography>
            <Typography variant="body1">Date of Birth: {user ? user.dob : 'Loading...'}</Typography>
            <Typography variant="body1">Course: {user ? user.course : 'Loading...'}</Typography>
            <Typography variant="body1">Degree: {user ? user.degree : 'Loading...'}</Typography>
            <Typography variant="body1">
              Resume: {resumeUrl ? <Link href={resumeUrl}>View Resume</Link> : 'No resume available'}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Profile;
