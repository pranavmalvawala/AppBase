import React from "react";
import { Dots } from "react-activity";

interface Props { size?: "sm" | "md" | "lg", loadingText?: string }


export const Loading: React.FC<Props> = (props) => {

    const getContents = () => {
        const text = (props.loadingText) ? props.loadingText : "Loading"
        switch (props.size) {
            case "sm":
                return <><Dots speed={0.8} animating={true} size={20} /><p style={{ fontSize: 12 }}>{text}</p></>
                break;
            case "lg":
                return <><Dots speed={0.8} animating={true} size={48} /><p style={{ fontSize: 30 }}>{text}</p></>
                break;
            default:
                return <><Dots speed={0.8} animating={true} size={32} /><p>{text}</p></>
                break;
        }
    }

    return (
        <div style={{ textAlign: "center", fontFamily: "Roboto" }}>
            {getContents()}
        </div>
    )
}
