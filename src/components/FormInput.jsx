import { useState } from "react";

export function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="form-group">
            <input id={id} {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
            <label htmlFor={id}>{label}</label>
            <span>{errorMessage}</span>
        </div>
    );
}
