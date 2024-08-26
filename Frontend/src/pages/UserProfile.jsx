import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid } from '@mui/material';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  return user ? (
    <div className="p-8">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {user.fullname}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Course:</strong> {user.course}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Degree:</strong> {user.degree}
          </Typography>
        </Grid>

        {/* Applied Jobs Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Applied Jobs
          </Typography>
          <Grid container spacing={2}>
            {user.appliedJobs.length > 0 ? (
              user.appliedJobs.map(job => (
                <Grid item xs={12} md={6} lg={4} key={job._id}>
                  <div className="p-4 bg-white shadow-md rounded-lg w-full h-auto">
                    {job.imageURL && (
                      <img src={job.imageURL} alt={job.jobTitle} className="rounded-lg h-44 w-full object-cover mb-4" />
                    )}
                    <Typography variant="h6" gutterBottom className="font-semibold mb-2">
                      {job.jobTitle}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" className="mb-2">
                      <strong>Company:</strong> {job.companyName}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" className="mb-2">
                      <strong>Location:</strong> {job.location}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" className="mb-2">
                      <strong>Type:</strong> {job.type}
                    </Typography>
                    <Typography variant="body2" className="mb-4">
                      {job.jobDescription}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>CTC:</strong> {job.ctc ? `${job.ctc} lacs` : 'Not Specified'}
                    </Typography>
                  </div>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No jobs applied yet.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default UserProfile;
