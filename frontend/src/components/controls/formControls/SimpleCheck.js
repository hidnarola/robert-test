import React from 'react';

const SimpleCheck = ({
    input,
    class_name,
    id,
    label,
    label_class_name,
    placeholder,
    type,
    meta: { touched, error, warning }
}) => {
    return (
        <div className={class_name}>
            <input {...input} id={id} placeholder={placeholder} type={type} />
            {label && <label htmlFor={label_class_name ? label_class_name : ''}>{label}</label>}
            {touched &&
                ((error && <span className="validation-error">{typeof error!=="undefined" && error ? error : ''}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    );
};

export default SimpleCheck;