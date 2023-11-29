import { React, useState, useEffect } from 'react';
import { Flex, Heading, Divider, Text, ScrollView, Collection } from '@aws-amplify/ui-react';
import styles from '../../styles/Portal_Module_1.module.css'
import { listBucketContentsForUser, deleteKeyForUser, getKeyMetadata } from '../../utils/uploadFiles.js'
import { ResponsiveButton as Button } from '../components/ResponsiveButton.js'
// This widget uses the user's Cognito credentials to list that user's bucket contents for a given bucket.
// It also provides functionality to individually delete/remove those contents.

export const RemoteFileDisplay = ({bucket}) =>  {
    
    let [remoteFiles, setRemoteFiles] = useState({});
    let [justCreated, setJustCreated] = useState(true);
    let [numberOfFiles, setNumberOfFiles] = useState(0);
    let [numberOfArchives, setNumberOfArchives] = useState(0);
    let [numberOfScans, setNumberOfScans] = useState(0);
    
    async function update() {
      console.log("Updating RemoteFileDisplay")
      const out_list = await listBucketContentsForUser(bucket)
      setRemoteFiles(out_list)
      
      var n_archives = 0;
      var n_scans = 0;
      var n_files = 0;
      if (out_list === undefined || out_list.length == 0) {
        return;
      }
      for (const item of out_list) {
          n_files += 1;
          if (fileIsArchive(item.key)) {
              n_archives += 1;
          }      
        }
      setNumberOfFiles(n_files)
      setNumberOfArchives(n_archives)
      setNumberOfScans(n_files - n_archives)
      console.log(remoteFiles)
    } 
    
    async function deleteKeyFromBucket(key) {
        await deleteKeyForUser(bucket, key)
        //alert("Placeholder From RemoteFileDisplay: User attempting to delete key " + key);
        update()
    }
    
    function fileIsArchive (key) {
        return key.endsWith(".zip") ? true 
           : key.endsWith(".tar.gz") ? true
           : key.endsWith(".tar")? true
           : false
    }
    
    function fileIsImage (key) {
        return key.endsWith(".nii.gz") ? true
        : false
    }
    
    async function getFileStatus (key) {
        if (fileIsArchive(key)) {
            const meta = await getKeyMetadata(bucket, key)
            return "Placeholder Archive Status" 
        }
        else if (fileIsImage(key)) {
            const meta = await getKeyMetadata(bucket, key)
            return "Placeholder Image Status"
        }
        else {
            return "N/A";
        }
    }
    
   useEffect(() => {
    const interval =  setInterval(() => {
        update();
        //alert("updating RemoteFileDisplay");
    }, 10000);

    return () => clearInterval(interval);
    }, [remoteFiles]);
    
    if (justCreated) {
        update();
        setJustCreated(false);
    }
    
    return (
        <div>
        <Divider orientation="horizontal" />
        <h2>Successfully uploaded scans:</h2>
            <ScrollView height='400px'> 
                <Collection 
                    items={remoteFiles}
                    type="list"
                    direction="column"
                    gap="10px"
                    wrap="nowrap"
                 >
                {(item, index) => (
                    <div>
                    <Flex direction={{ base: 'row' }} width="100%" justifyContent="space-between">
                    <Text>File key: {item.key}</Text>
                    <Text>Type: {fileIsArchive(item.key)? "Archive" : fileIsImage(item.key)? "Scan" : "Other"}</Text>
                    
                    <Button loadingText="Deleting..." variation="destructive" onClick={async () => {deleteKeyFromBucket(item.key)}}>Delete</Button>
                    </Flex>
                    <Divider />
                    </div> 
                    )}
                </Collection>
            </ScrollView>
        <p><b>Total files: {numberOfFiles} ({numberOfArchives} archives, {numberOfScans} scans)</b></p>
        <Divider orientation="horizontal" />
        </div>
    )
}