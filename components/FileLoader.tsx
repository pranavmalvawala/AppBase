import React from "react";
import { ApiHelper } from "../helpers";
import { ApiListType } from "../interfaces";


interface Props { url: string, title: string, fileType: string, keyName: ApiListType }
export const FileLoader: React.FC<Props> = (props) => {

    const [blobUrl, setBlobUrl] = React.useState<string>("");
    const [datType, setDataType] = React.useState<string>(props.fileType);

    const loadData = () => {
        ApiHelper.getAnonymous(props.url, props.keyName).then(data => {
            var temp = Buffer.from(data.content, 'base64')
            setDataType(data.type);
            setBlobUrl(URL.createObjectURL(new Blob([temp], { type: data.type })));
        });
    }

    React.useEffect(() => {
        if (props.url.split(":")[0] === "https") setBlobUrl(props.url); // checking if the url is a valid url not a path(for default tabs/images) 
        else loadData();

        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                datType === "text/html" ?
                    <iframe src={blobUrl} frameBorder="0" title={props.title} /> :
                    <img src={blobUrl} alt={props.title} />
            }
        </>
    );
}




