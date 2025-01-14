import React from "react";
import { Box, Chip, Grid, Divider, Typography } from '@material-ui/core'
import Stack from '@mui/material/Stack';

export default function Payment({ pageNum, setPageNum }) {

    const handleSubmit = (e) => {
      e.preventDefault()
    }
    return (
      
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
  
  
          </Grid>
          <Typography color="text.secondary" variant="body2">
            Please choose your method of payment.
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
  
          <Stack direction="column" spacing={5}>
          <form onSubmit={handleSubmit}></form>
        <Chip label="Visa/Master Card" component="a" href="#basic-chip" variant="outlined" clickable />
        <br></br>
        <Chip label="Paypal" component="a" href="#basic-chip" variant="outlined" clickable />
        <br></br>
        <Chip label="Pay with Terra" component="a" href="#basic-chip" variant="outlined" clickable = {true} onClick={() => setPageNum(5)}/>
  
      </Stack>
        </Box>
  
      </Box>
    );
  }
