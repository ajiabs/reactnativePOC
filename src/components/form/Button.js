import React, {Component, PropTypes} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {getStyleFromProps} from '../../utils';
import {TextFont} from '../text';
import { Font } from 'expo';

export default class Button extends Component {
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
            ...styleButton.container,
            ...getStyleFromProps(['marginTop', 'width', 'flex', 'padding', 'borderRadius','backgroundColor'], this.props)
        };
        const buttonStyle = {
            ...styleButton.text,
          
            fontFamily:this.state.fontLoaded?'akrobat':''
        }

        return <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={style} onPress={this.props.onPress}>
                <TextFont style={buttonStyle}>{this.props.children}</TextFont>
            </TouchableOpacity>
        </View>
    }
}

Button.defaultProps = {
    width: 179,
    padding: 16,
    borderRadius: 30,
    backgroundColor: '#4f55a3'
}

Button.propTypes = {
    marginTop: PropTypes.number,
    width: PropTypes.number,
    flex: PropTypes.number,
    onPress: PropTypes.func,
    padding: PropTypes.number,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
}

const styleButton = {
    container: {
        // paddingTop: 16,
        // paddingBottom: 16,
        // paddingLeft: 47,
        // paddingRight: 47,
        // backgroundColor: '#4f55a3',
        // borderRadius: 30,
        alignItems: "stretch",
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 1
        }
    },
    text: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: "600",
        textAlign: "center",
        letterSpacing: 3,

    },
    fontStyle: {
        fontFamily:'akrobat'
    },
}