import React from "react";
import { ApiHelper } from "../helpers";
import { ApiListType } from "../interfaces";

interface Props { fileType: string, api: ApiListType, id: string }

export const FileLoader: React.FC<Props> = (props) => {

    const [blobUrl, setBlobUrl] = React.useState<string>("");

    const loadData = () => {
        ApiHelper.getAnonymous("/files/" + props.id, props.api).then(data => {
            var temp = Buffer.from(data.content, 'base64')
            setBlobUrl(URL.createObjectURL(new Blob([temp], { type: data.type })));
        });
    }

    React.useEffect(() => {
        loadData();
    }, [])

    if (blobUrl !== "") {
        window.location.href = blobUrl;
    }
    else return <></>;
}




