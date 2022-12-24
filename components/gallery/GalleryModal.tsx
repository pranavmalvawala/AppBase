import { FileHelper } from "@/appBase/helpers";
import { ApiHelper, EnvironmentHelper } from "@/helpers";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { ImageEditor } from "../ImageEditor";
import { TabPanel } from "../TabPanel";

interface Props {
  onClose: () => void,
  onSelect: (img: string) => void
}

export const GalleryModal: React.FC<Props> = (props: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (el: any, newValue: any) => { setTabIndex(newValue); }

  const loadData = () => { ApiHelper.get("/gallery", "ContentApi").then(data => setImages(data.images)); }


  const handleImageUpdated = async (dataUrl: string) => {
    const fileName = Math.floor(Date.now() / 1000).toString() + ".jpg"
    const blob = FileHelper.dataURLtoBlob(dataUrl);
    const file = new File([blob], "file_name");

    const params = { fileName };
    const presigned = await ApiHelper.post("/gallery/requestUpload", params, "ContentApi");
    const doUpload = presigned.key !== undefined;
    if (doUpload) await FileHelper.postPresignedFile(presigned, file, () => { });
    //return doUpload;
    setTabIndex(0);
    loadData();
  };

  React.useEffect(loadData, []); //eslint-disable-line

  const getImages = () => {
    let result: JSX.Element[] = [];
    images.forEach(img => {
      result.push(<Grid item md={4} xs={12}>
        <a href="about:blank" onClick={(e) => { e.preventDefault(); props.onSelect(EnvironmentHelper.Common.ContentRoot + "/" + img) }}>
          <img src={EnvironmentHelper.Common.ContentRoot + "/" + img} className="img-fluid" />
        </a>
      </Grid>);
    })
    return result;
  }


  return (<>
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Select a Photo</DialogTitle>
      <DialogContent style={{ minWidth: 400 }}>

        <Tabs variant="fullWidth" value={tabIndex} onChange={handleTabChange}>
          <Tab label="Gallery" />
          <Tab label="Upload" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <Grid container spacing={3} alignItems="center">
            {getImages()}
          </Grid>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <ImageEditor onUpdate={handleImageUpdated} onCancel={() => { setTabIndex(0); }} photoUrl="" aspectRatio={2} />
        </TabPanel>

      </DialogContent>
      <DialogActions sx={{ paddingX: "16px", paddingBottom: "12px" }}>
        <Button variant="outlined" onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </>);
};
