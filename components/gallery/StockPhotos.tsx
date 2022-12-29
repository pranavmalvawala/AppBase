import { Grid } from "@mui/material";
import React, { useState } from "react";
import { ApiHelper } from "../../helpers";
import { CommonEnvironmentHelper } from "../../helpers/CommonEnvironmentHelper";

interface Props {
  aspectRatio: number,
  onSelect: (img: string) => void
}

export const StockPhotos: React.FC<Props> = (props: Props) => {
  const [images, setImages] = useState<string[]>([]);

  const loadData = () => { ApiHelper.getAnonymous("/gallery/stock/" + props.aspectRatio.toString(), "ContentApi").then(data => setImages(data.images)); }

  React.useEffect(loadData, [props.aspectRatio]); //eslint-disable-line

  const getImages = () => {
    let result: JSX.Element[] = [];
    images.forEach(img => {
      result.push(<Grid item md={4} xs={12}>
        <a href="about:blank" onClick={(e) => { e.preventDefault(); props.onSelect(CommonEnvironmentHelper.ContentRoot + "/" + img) }}>
          <img src={CommonEnvironmentHelper.ContentRoot + "/" + img} className="img-fluid" alt="stock" />
        </a>
      </Grid>);
    })
    return result;
  }

  return (<>
    Stock Photos
    <Grid container spacing={3} alignItems="center">
      {getImages()}
    </Grid>
  </>);
};
