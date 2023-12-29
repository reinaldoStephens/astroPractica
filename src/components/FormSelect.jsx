import { useState } from "react";

export function FormSelect(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="form-group">
            <select id={id} {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}>
                {props.children}
            </select>
            <span>{errorMessage}</span>
        </div>
    );
}
