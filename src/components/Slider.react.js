import React, {Component} from 'react';
import ReactSlider from 'rc-slider';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import './css/rc-slider@6.1.2.css';

/**
 * A slider component with a single handle.
 */
export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.value});
    }

    render() {
        const {
            className,
            id,
            loading_state,
            setProps,
            updatemode,
            vertical,
        } = this.props;
        const {value} = this.state;
        return (
            <div
                id={id}
                data-dash-is-loading={
                    (loading_state && loading_state.is_loading) || undefined
                }
                className={className}
                style={vertical ? {height: '100%'} : {}}
            >
                <ReactSlider
                    onChange={value => {
                        this.setState({value});
                        if (updatemode === 'drag') {
                            if (setProps) {
                                setProps({value});
                            }
                        }
                    }}
                    onAfterChange={value => {
                        if (updatemode === 'mouseup') {
                            if (setProps) {
                                setProps({value});
                            }
                        }
                    }}
                    value={value}
                    {...omit(
                        ['className', 'setProps', 'updatemode', 'value'],
                        this.props
                    )}
                />
            </div>
        );
    }
}

Slider.propTypes = {
    id: PropTypes.string,

    /**
     * Marks on the slider.
     * The key determines the position,
     * and the value determines what will show.
     * If you want to set the style of a specific mark point,
     * the value should be an object which
     * contains style and label properties.
     */
    marks: PropTypes.shape({
        number: PropTypes.oneOfType([
            /**
             * The label of the mark
             */
            PropTypes.string,

            /**
             * The style and label of the mark
             */
            PropTypes.shape({
                style: PropTypes.object,
                label: PropTypes.string,
            }),
        ]),
    }),

    /**
     * The value of the input
     */
    value: PropTypes.number,

    /**
     * Additional CSS class for the root DOM node
     */
    className: PropTypes.string,

    /**
     * If true, the handles can't be moved.
     */
    disabled: PropTypes.bool,

    /**
     * When the step value is greater than 1,
     * you can set the dots to true if you want to
     * render the slider with dots.
     */
    dots: PropTypes.bool,

    /**
     * If the value is true, it means a continuous
     * value is included. Otherwise, it is an independent value.
     */
    included: PropTypes.bool,

    /**
     * Minimum allowed value of the slider
     */
    min: PropTypes.number,

    /**
     * Maximum allowed value of the slider
     */
    max: PropTypes.number,

    /**
     * Value by which increments or decrements are made
     */
    step: PropTypes.number,

    /**
     * If true, the slider will be vertical
     */
    vertical: PropTypes.bool,

    /**
     * Determines when the component should update
     * its value. If `mouseup`, then the slider
     * will only trigger its value when the user has
     * finished dragging the slider. If `drag`, then
     * the slider will update its value continuously
     * as it is being dragged.
     * Only use `drag` if your updates are fast.
     */
    updatemode: PropTypes.oneOf(['mouseup', 'drag']),

    /**
     * Dash-assigned callback that gets fired when the value changes.
     */
    setProps: PropTypes.func,

    /**
     * Object that holds the loading state object coming from dash-renderer
     */
    loading_state: PropTypes.shape({
        /**
         * Determines if the component is loading or not
         */
        is_loading: PropTypes.bool,
        /**
         * Holds which property is loading
         */
        prop_name: PropTypes.string,
        /**
         * Holds the name of the component that is loading
         */
        component_name: PropTypes.string,
    }),
};

Slider.defaultProps = {
    updatemode: 'mouseup',
};
