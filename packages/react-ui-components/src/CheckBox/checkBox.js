import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';

const CheckBox = props => {
    const handleChange = () => {
        const {onChange, isChecked} = props;

        if (onChange) {
            onChange(!isChecked);
        }
    };

    const {
        isChecked,
        isDisabled,
        className,
        theme,
        ...rest
    } = props;
    const finalClassName = mergeClassNames({
        [className]: className && className.length,
        [theme.checkbox]: true,
        [theme.checkbox__disabled]: isDisabled
    });
    const mirrorClassNames = mergeClassNames({
        [theme.checkbox__inputMirror]: true,
        [theme['checkbox__inputMirror--active']]: isChecked
    });

    return (
        <div className={finalClassName}>
            <input
                {...rest}
                className={theme.checkbox__input}
                type="checkbox"
                checked={isChecked}
                aria-checked={isChecked}
                onChange={handleChange}
                disabled={isDisabled}
                />
            <div className={mirrorClassNames}/>
        </div>
    );
};
CheckBox.propTypes = {
    /**
     * This prop controls the visual active state of the CheckBox.
     */
    isChecked: PropTypes.bool.isRequired,

    /**
     * This prop controls if the CheckBox is disabled or not.
     */
    isDisabled: PropTypes.bool,

    /**
     * An optional `className` to attach to the wrapper.
     */
    className: PropTypes.string,

    /**
     * An optional change handler which gets called once the user clicks on the CheckBox.
     */
    onChange: PropTypes.func,

    /**
     * An optional css theme to be injected.
     */
    theme: PropTypes.shape({
        checkbox: PropTypes.string,
        checkbox__input: PropTypes.string, // eslint-disable-line
        checkbox__inputMirror: PropTypes.string, // eslint-disable-line
        'checkbox__inputMirror--active': PropTypes.string
    }).isRequired
};

export default CheckBox;
