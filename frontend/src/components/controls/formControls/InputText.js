import React from 'react';
import cns from 'classnames';
import ReactTooltip from 'react-tooltip'

const InputText = ({
    input,
    class_name,
    label,
    disabled,
    label_class_name,
    placeholder,
    type,
    meta: { touched, error, warning }
}) => {
    return (
        <div className="label-input">
            {label && <label className={cns('text-label', label_class_name ? label_class_name : '')}>{label}</label>}
            <div className={class_name} data-tip={(touched && error) ? error : ''}>
                <input {...input} disabled={disabled ? disabled : ''} placeholder={placeholder} type={type} />
                {touched &&
                    (
                        (error &&
                            <React.Fragment>
                                <span className="validation-error"></span>
                                <ReactTooltip place="top" type="error" effect="solid" />
                            </React.Fragment>
                        ) ||
                        (warning &&
                            <span>{warning}</span>
                        )
                    )}
            </div>
        </div>
    );
};

export default InputText;