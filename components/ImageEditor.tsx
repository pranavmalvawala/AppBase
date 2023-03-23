import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { InputBox, SmallButton } from ".";

interface Props {
  title?: string;
  photoUrl: string;
  aspectRatio: number;
  onUpdate: (dataUrl?: string) => void;
  onCancel?: () => void;
  outputWidth?: number;
  outputHeight?: number;
  hideDelete?: boolean;
}

export function ImageEditor(props: Props) {
  const [photoSrc, setPhotoSrc] = useState<string>("");
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState<string>("");
  const cropperRef = useRef<HTMLImageElement>(null);
  let timeout: any = null;

  const handleSave = () => props.onUpdate(croppedImageDataUrl);

  const handleDelete = () => props.onUpdate("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let files;
    if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result.toString();
      setPhotoSrc(url);
      setCroppedImageDataUrl(url);
      setTimeout(selectDefaultCropZone, 500);
    };
    reader.readAsDataURL(files[0]);
  };

  const selectDefaultCropZone = () => {
    const imageElement: any = cropperRef?.current;
    var cropper: any = imageElement?.cropper;
    if (props.aspectRatio===0)
    {
      var containerData = cropper.getContainerData();
      const imgWidth = cropper.getImageData().width;
      const imgHeight = cropper.getImageData().height;
      const effectiveWidth = (containerData.width > imgWidth) ? imgWidth : containerData.width;
      const effectiveHeight = (containerData.height > imgHeight) ? imgHeight : containerData.height;
      cropper.setCropBoxData({ width: effectiveWidth, height: effectiveHeight, left: (containerData.width - effectiveWidth) / 2.0 , top: (containerData.height - effectiveHeight) / 2.0 });
    } else {
      var desiredAspect = props.aspectRatio;
      var containerData = cropper.getContainerData();
      var imgAspect = cropper.getImageData().aspectRatio;
      var scale = imgAspect / desiredAspect;
      console.log("Aspect", desiredAspect, imgAspect, scale)
      if (scale < 1) {
        const imgWidth = cropper.getImageData().width;
        let l = (containerData.width - imgWidth) / 2.0;
        let t = (containerData.height - (containerData.height * scale)) / 2.0;
        cropper.setCropBoxData({ width: imgWidth, height: imgWidth / desiredAspect, left: l, top: t });
      } else {
        const imgHeight = cropper.getImageData().height;
        console.log("MADE IT", containerData.height, imgHeight)
        let l = (containerData.width - (imgHeight * desiredAspect)) / 2.0;
        let t = 0;
        console.log({ width: imgHeight * desiredAspect, height: containerData.height, left: l, top: t })
        cropper.setCropBoxData({ width: imgHeight * desiredAspect, height: imgHeight, left: l, top: t });
      }
    }

  }

  const handleCrop = () => {
    if (timeout !== null) {
      window.clearTimeout(timeout);
      timeout = null;
    }

    timeout = window.setTimeout(() => {
      if (cropperRef.current !== null) {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;

        const url = cropper.getCroppedCanvas({ width: props.outputWidth || 400, height: props.outputHeight || 300 }).toDataURL("image/png", 0.4);
        setCroppedImageDataUrl(url);
      }
    }, 200);
  };

  useEffect(() => { setPhotoSrc(props.photoUrl); }, [props.photoUrl]);

  return (
    <InputBox
      id="cropperBox"
      headerIcon=""
      headerText={props.title}
      ariaLabelDelete="deletePhoto"
      saveText="Update"
      saveFunction={handleSave}
      cancelFunction={props.onCancel}
      deleteFunction={(!props.hideDelete) && handleDelete}
      headerActionContent={
        <div>
          <input type="file" onChange={handleUpload} id="fileUpload" accept="image/*" style={{ display: "none" }} />
          <SmallButton
            icon="upload"
            text="Upload"
            onClick={() => {
              document.getElementById("fileUpload").click();
            }}
          />
        </div>
      }
    >
      <Cropper
        ref={cropperRef}
        src={photoSrc}
        style={{ height: 240, width: "100%" }}
        aspectRatio={props.aspectRatio}
        guides={false}
        crop={handleCrop}
      />
    </InputBox>
  );
}
