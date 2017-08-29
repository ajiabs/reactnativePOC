import React, {Component, PropTypes} from 'react';
import {View, TextInput, StyleSheet, Animated} from 'react-native';
import {getStyleFromProps} from '../../utils';
import {TextFont} from '../text';
import { Font } from 'expo';

// Distance label top with input container default
const LABEL_DEFAULT_TOP = 15;
const LABEL_DEFAULT_TOP_FOCUS = 0;

// Label size when animated
const LABEL_FONT_SIZE = 14;
const LABEL_FONT_SIZE_FOCUS = 16;

export default class Input extends Component {
    state = {
        _labelPositionTop: new Animated.Value(LABEL_DEFAULT_TOP),
        _labelFontSize: new Animated.Value(14)
    }

    handleFocus() {
        Animated.timing(this.state._labelPositionTop, {
            toValue: LABEL_DEFAULT_TOP_FOCUS,
            duration: 300,
        }).start();
        Animated.timing(this.state._labelFontSize, {
            toValue: LABEL_FONT_SIZE_FOCUS,
            duration: 300,
        }).start();
    }

    handleBlur(){
        if(!this.props.value){
            Animated.timing(this.state._labelPositionTop, {
                toValue: LABEL_DEFAULT_TOP,
                duration: 300,
            }).start();
            Animated.timing(this.state._labelFontSize, {
                toValue: LABEL_FONT_SIZE,
                duration: 400,
            }).start();
        }
    }

     async componentDidMount() {
    await Font.loadAsync({
      'akrobat': require('../../../assets/fonts/Akrobat-Bold.otf'),
    });

    this.setState({ fontLoaded: true , font:'akrobat'});
  }

    renderLabel(){
        const styleLabelContainer = {
            ...styleInput.labelContainer,
            top: this.state._labelPositionTop
        }
        const styleLabel = {
            ...styleInput.label,
            fontSize: this.state._labelFontSize,
            color:this.props.color,
            fontFamily:this.state.fontLoaded?'akrobat':''
        }
        return  <Animated.View style={styleLabelContainer}>
                <TextFont>
                    <Animated.Text style={styleLabel}>
                        {this.props.label}
                    </Animated.Text>
                </TextFont>
        </Animated.View>
    }

    renderInputText(){
        const inputStyle = {
            ...styleInput.input,
           
            color:this.props.color
        }
        if(this.props.multiline)
            return <TextInput
            value={this.props.value}
            style={inputStyle}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onChangeText={this.props.onChange}
            secureTextEntry={this.props.secureTextEntry}
            underlineColorAndroid='rgba(0,0,0,0)'
            multiline = {true} numberOfLines = {4}
        />
        else
        return <TextInput
            keyboardType={this.props.keyboardType}
            value={this.props.value}
            style={styleInput.input}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onChangeText={this.props.onChange}
            secureTextEntry={this.props.secureTextEntry}
            underlineColorAndroid='rgba(0,0,0,0)'
            maxLength = {this.props.maxLength}
        />
    }

    renderLabelInputCombine(){
        const styleInputContainer = [
            styleInput.inputContainer,
            getStyleFromProps(['marginTop'], this.props)
        ];
        return <View style={styleInputContainer}>
            {this.renderLabel()}
            {this.renderInputText()}
            {this.renderLineWhite()}
        </View>
    }

    renderLineWhite(){
        const styleLine = {
            ...styleInput.lineWhite,
            backgroundColor: this.props.lineColor
        };
        return <View style={styleLine}></View>
    }

    renderInputWithIcon(){
        return <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <View style={{width: 40}}>
                {React.cloneElement(this.props.icon, {
                    color: '#ffffff',
                    size: 25
                })}
            </View>
            <View style={{flex: 1}}>
                {this.renderLabelInputCombine()}
            </View>
        </View>
    }


    render() {
        if(this.props.icon) return this.renderInputWithIcon();
        return this.renderLabelInputCombine();
    }
}
Input.defaultProps = {
    lineColor: '#FFF',
    color:'#FFF'
}

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    multiline: PropTypes.string,
    color: PropTypes.string,
    lineColor: PropTypes.string,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number
}

const styleInput = {
    inputContainer: {
        position: 'relative',
        height: 51,
        justifyContent: 'flex-end'
    },
    labelContainer: {
        position: 'absolute',
        top: 100
    },
    label: {
        color: '#ffffff',
        fontSize: 14,
        letterSpacing: 0.9
    },
    lineWhite:{
        height: 2,
        backgroundColor: '#ffffff',
        opacity: .51
    },
    input: {
        height: 34,
        // color: '#ffffff',
        borderWidth: 0,
        borderColor: 'transparent',
        fontSize: 14,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0
    }
};

Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    marginTop: PropTypes.number
}