import React from 'react';
import ReactTooltip from 'react-tooltip'

const SimpleInputText = ({
    input,
    placeholder,
    type,
    disabled,
    meta: { touched, error, warning }
}) => {
    return (
        <React.Fragment >
            <div data-tip={(touched && error) ? error : ''}>
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
        </React.Fragment>
    );
};

export default SimpleInputText;