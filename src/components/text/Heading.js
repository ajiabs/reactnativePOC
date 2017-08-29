import React, {Component, PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import {getStyleFromProps} from '../../utils';
import TextFont from './TextFont';
import { Font } from 'expo';

export default class Heading extends Component {
     constructor(){
        super();
    this.state ={
        fontLoaded:false
    };
}
     async componentDidMount() {
    await Font.loadAsync({
      'akrobat': require('../../../assets/fonts/Akrobat-Bold.otf'),
    });

    this.setState({ fontLoaded: true , font:'akrobat'});
  }
    render() {
        const style = {
            ...headingStyle[this.props.element],
            fontFamily:this.state.fontLoaded?'akrobat':'',
            ...getStyleFromProps(['color', 'textAlign', 'marginTop', 'letterSpacing'], this.props)
        }
        return <TextFont {...this.props} style={style}>
            {this.props.children}
        </TextFont>
    }
}

Heading.defaultProps = {
    element: "h1",
    letterSpacing: 2
}

Heading.propTypes = {
    element: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
    color: PropTypes.string,
    letterSpacing: PropTypes.number,
    textAlign: PropTypes.string,
    marginTop: PropTypes.number
}

const headingStyle = {
    h1: {
        fontSize: 30
    },
    h2: {
        fontSize: 25,
    },
    h3: {
        fontSize: 20
    },
    h4: {
        fontSize: 18
    },
    fontStyle: {
        fontFamily: 'akrobat'
    }
}