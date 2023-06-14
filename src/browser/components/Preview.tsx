import { Form } from "../types/Form";

const Preview = ({ question, url, title, expect, contents, tried, active, code, console }: Form) => {
    return (
        <div className={active}>
            <div>Preview</div>
            <div>{question}</div>
            <div>{url}</div>
            <div>{title}</div>
            <div>{expect}</div>
            <div>{contents}</div>
            <div>{tried}</div>
            <textarea placeholder={code}></textarea>
            <br></br>
            <textarea placeholder={console}></textarea>
        </div>
    );
};

export default Preview;
