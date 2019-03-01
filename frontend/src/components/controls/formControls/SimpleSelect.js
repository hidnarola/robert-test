import React from 'react';
import cns from 'classnames';
import ReactTooltip from 'react-tooltip'
import loadingIcon from '../../assets/loading1.svg';

const SimpleSelect = ({ input, class_name, label, loading, label_class_name, options, disabled, meta: { touched, error, warning } }) => {
    return (
        <div className="label-input label-select">
            {label && <label className={cns('text-label', label_class_name ? label_class_name : '')}>{label}</label>}
            <div className={class_name} data-tip={(touched && error) ? error : ''}>
            {loading ? <img alt="loading" src={loadingIcon} /> : ''}
                <select {...input} disabled={disabled ? disabled : null}>
                    {options && options.map((o, i) => {
                        return (
                            <option key={i} value={o.value}>{o.label}</option>
                        )
                    })}
                </select>
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

export default SimpleSelect;