import React, {Component, PropTypes} from 'react';
import {
    View, Image, Dimensions, TouchableOpacity, Platform, AsyncStorage, Text, Easing, Alert, NetInfo
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {getStyleFromProps, getPlatformValue} from '../../utils';
const window = Dimensions.get('window');

export default class BackgroundWrapper extends Component {

    constructor(){
        super();
       
      
    }
    
    renderChildren() {
        let childrens = [];
        if (this.props.iconLeft) childrens.push(
            <TouchableOpacity key="icon_left" onPress={this.props.onPressIcon} style={{height: 50,zIndex: 15, width:window.width/8}}>
                <Icon color="#ffffff" size={25} name={this.props.iconLeft} style={styleWrapper.icon}/>
            </TouchableOpacity>
        );
        if (this.props.iconMenu) childrens.push(
            <TouchableOpacity key="icon_left" onPress={() => {this.refs.navigationDrawer.openDrawer()}} style={{height: 50,zIndex: 15, width:window.width/8}}>
                <Icon color="#ffffff" size={25} name="menu" style={styleWrapper.icon}/>
            </TouchableOpacity>
        );



       
        childrens.push(this.props.children);
        return childrens;
    }

   

    renderViewBackground() {
        const style = [
            styleWrapper.containerView,
            getStyleFromProps(['paddingTop'], this.props)
        ]

       
        <View style={style}>
            {this.renderChildren()}
        </View>
    }

    render() {

        
            return this.renderViewBackground()
        
       
    }
}

BackgroundWrapper.propTypes = {
    iconLeft: PropTypes.string,
    onPressIcon: PropTypes.func,
    paddingTop: PropTypes.number
}

const styleWrapper = {
    containerImage: {
        width: window.width,
        height: window.height,
        resizeMode: getPlatformValue('android', 'cover', 'contain'),
        paddingTop: getPlatformValue('android', 5, 22),
    },
    containerView: {
        flex: 1,
        paddingTop: getPlatformValue('android', 5, 22),
        backgroundColor: '#ee6668',

    },
    icon: {
        marginLeft: 10,
        position: 'relative',
        top: 9,
        opacity: .8,
        backgroundColor: 'transparent'
    }
}


