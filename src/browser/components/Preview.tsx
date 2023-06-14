import { Form } from "../types/Form";

const Preview = ({ question, url, title, expect, contents, tried, active }: Form) => {
    return (
        <div className={active}>
            <div>Preview</div>
            <div>{question}</div>
            <div>{url}</div>
            <div>{title}</div>
            <div>{expect}</div>
            <div>{contents}</div>
            <div>{tried}</div>
        </div>
    );
};

export default Preview;
