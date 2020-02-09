import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

import { Input } from "galio-framework";

import Icon from './Icon';

class ArInput extends React.Component {
  render() {
    const { shadowless, success, error, primary } = this.props;

    const inputStyles = [
      styles.input,
      !shadowless,
      success && styles.success,
      error && styles.error,
      primary && styles.primary,
      {...this.props.style}
    ];

    return (
      <Input
        placeholder="write something here"
        placeholderTextColor='#9FA5AA'
        style={inputStyles}
        color='#898989'
        iconContent={
          <Icon
            size={14}
            color='#000000'
            name="link"
            family="AntDesign"
          />
        }
        {...this.props}
      />
    );
  }
}

ArInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
  primary: false
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  primary: PropTypes.bool
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderColor: '#000000',
    height: 44,
    backgroundColor: '#FFFFFF'
  },
  success: {
    borderColor: '#45DF31'
  },
  error: {
    borderColor: '#FE2472'
  },
  primary: {
    borderColor: '#B23AFC'
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  }
});

export default ArInput;
