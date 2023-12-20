import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import styles from '../styles/About.module.css';
import { Grid, Paper, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Heading, Divider } from '@aws-amplify/ui-react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Quickstart = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Quickstart</title>
        <Favicons />
      </Head>
      <Header />
      <div className={styles.mainContent}>
        <Paper className={styles.paper}>
          <Box textAlign="center">
            <Heading level={1}>Quickstart Guide</Heading>
            <Divider/>
          </Box>
          <Box>
            <p>If you already know you're interested in NiChart, this guide will help you get started as fast as possible.</p>
            <p>There are two ways to use NiChart: from your own machine, or via NiChart Cloud. The easiest way to get started is to use NiChart Cloud, accessible from this site.</p>
            <br></br>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Registering</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p>To begin, click the "NiChart Cloud" button in the header.</p>
                <p>You will need to register an account and sign in.</p>
                <p>If you are having trouble finding the registration email, be sure to check your spam folder.</p>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Module 1: Image Processing</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p>The box on the left allows you to upload your T1 NIFTI brain scans (If you have a lot of scans, you can also upload a .zip archive.).</p>
                <p>You can drag and drop, or use the upload button.</p>
                <p>Wait for your files to upload. You can check the files currently on the backend server with the "View Uploaded Files" button.</p>
                <p>When uploading large files, you may see fluctuations in the displayed progress. Do not worry -- as long as the upload does not fail, it will correct itself.</p>
                <br></br>
                <p>When you're ready to run image processing, click "Submit Jobs". This will spin up jobs for each scan you uploaded.</p>
                <p>You'll see the jobs pop up shortly on the middle column. Wait for them to finish and show a green smiley.</p>
                <p>When they're all green, you can download your ROI volumes with "Download MUSE CSV" or download the resulting images with "Download MUSE ROIs". Be patient, it takes a second to collect your output.</p>
                <br></br>
                <p>If you like, you can export your files directly to the next module.</p>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Module 2: Machine Learning</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p>This module needs both your ROI volume CSV and a separate demographics CSV file.</p>
                <p>Press "Download Template" to see an example of the demographics CSV.</p>                
                <p>Use the file uploaders on the left to upload both files.</p>
                <p>The rows in the demographic CSV should correspond with the same filenames from Module 1.</p>
                <p>You can select which models to run on your data with the "Select Models" button.</p>
                <p>When you're ready, hit "Generate SPARE Scores". One job will appear in the job list to the right.</p>
                <p>Wait for the job to complete, then you can download your full results with "Download SPARE score CSV". This file will have not only your ROI volumes, but also your demographic information and the SPARE scores generated by the models you selected.</p>
                <p>You can then export your data to Module 3 where you can visualize it.</p>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Module 3: Visualization</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p>Either upload your CSV from Module 2, or upload your own file. Be aware that if you upload your own file, it may not have all the fields needed to perform charting against reference datasets.</p>
                <p>Select the ROI you want to know about and click "Add Plot". This will show you how the scans you uploaded compare to the trends for the reference data.</p>
                <p>At any time, you can change the reference dataset to view your scans in comparison to a different reference set.</p>
              </AccordionDetails>
            </Accordion>                
            <br></br><br></br>
            <Heading level={2}>Frequently Asked Questions</Heading>
            <b>We will update this FAQ as we receive more feedback. Stay tuned!</b>
          </Box>

        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default Quickstart;
