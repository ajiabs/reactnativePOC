import React, {Component, PropTypes} from 'react';
import {View, TextInput, StyleSheet, Animated, Picker} from 'react-native';
import {getStyleFromProps} from '../../utils';
import {TextFont} from '../text';
import Environment from '../../../environment';
import { Font } from 'expo';


// Distance label top with input container default
const LABEL_DEFAULT_TOP = 15;
const LABEL_DEFAULT_TOP_FOCUS = 0;

// Label size when animated
const LABEL_FONT_SIZE = 14;
const LABEL_FONT_SIZE_FOCUS = 16;

export default class Select extends Component {
    constructor () {
        super();
        this.getAllCategories();
        
    }
    state = {
        _labelPositionTop: new Animated.Value(LABEL_DEFAULT_TOP),
        _labelFontSize: new Animated.Value(14),
        categories: [],
        fontLoaded: false
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

    getAllCategories() {

        fetch(Environment.CLIENT_ALL_CATEGORY_FETCH_API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'device_id':'1234',
                'device_type':'android',
             },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.data.length===0) {
            }
            else {
                this.setState({categories:responseData.data, cat_loading:false})
            }
        })
        .done();
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
        var categoryItems =[];
        categoryItems.push(<Picker.Item value='' label='Select Category' key='' color='#6267ad'/>)
        for (var i = 0; i <this.state.categories.length ; i++) {
            let cat_id = this.state.categories[i].category_id;
            let cat_name = this.state.categories[i].category_name;
            categoryItems.push(<Picker.Item value={cat_id} label={cat_name} key={cat_id}/>)
        }
        if (this.props.selectCategory)
        {
            var pickerItems = [];
            pickerItems = categoryItems;
        }
        else if(this.props.selectType) 
        {

            var pickerItems = [];
            pickerItems.push(<Picker.Item value='' label='Choose Type' key='' color='#6267ad'/>)
            pickerItems.push(<Picker.Item value='new' label='New' key='new'/>)
            pickerItems.push(<Picker.Item value='used' label='Used' key='used'/>)
        }
        else if(this.props.selectCondition) 
        {
            var pickerItems = [];
            pickerItems.push(<Picker.Item value='' label='Choose Condition' key='' color='#6267ad'/>)
            pickerItems.push(<Picker.Item value='new' label='New' key='new'/>)
            pickerItems.push(<Picker.Item value='likenew' label='Like New' key='likenew'/>)
            pickerItems.push(<Picker.Item value='good' label='Good' key='good'/>)
            pickerItems.push(<Picker.Item value='verygood' label='Very Good' key='verygood'/>)
        }
        else if(this.props.selectYear) 
        {
            var pickerItems = [];
            pickerItems.push(<Picker.Item value='' label='Select Year' key='' color='#6267ad'/>)
            for(var i=1990; i<=2017;i++)
            {
                var label = i.toString();
                pickerItems.push(<Picker.Item value={i} label={label} key={i}/>)
            }
            
        }
         else if(this.props.selectExpYear) 
        {
            var pickerItems = [];
            pickerItems.push(<Picker.Item value='' label='Select Year' key='' color='#6267ad'/>)
            for(var i=2017; i<=2030;i++)
            {
                var label = i.toString();
                pickerItems.push(<Picker.Item value={i} label={label} key={i}/>)
            }
            
        }
        else if(this.props.selectExpMonth) 
        {
            var pickerItems = [];
            pickerItems.push(<Picker.Item value='' label='Select Month' key='' color='#6267ad'/>)
            for(var i=1; i<=12;i++)
            {
                var label = i.toString();
                pickerItems.push(<Picker.Item value={i} label={label} key={i}/>)
            }
            
        }
        const optionStyle = {
            ...styleInput.input,
            color: this.props.color,
             fontFamily:this.state.fontLoaded?'akrobat':'',
        };
        return <Picker
            
            style={optionStyle}
            mode='dropdown'
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}            
            onValueChange= {this.props.onChange}
            selectedValue={this.props.selectedValue}>
            
            {pickerItems}
        </Picker>
        
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

    


    render() {

         
        if(this.props.icon) return this.renderInputWithIcon();
        return this.renderLabelInputCombine();
    }
}

Select.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    selectCategory:PropTypes.string,
    selectedValue:PropTypes.string,
    color:PropTypes.string,
    lineColor: PropTypes.string


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
        // height: 34,
        color: '#ffffff',
        // borderWidth: 0,
        // borderColor: 'transparent',
        // // fontSize: 14,
        // paddingTop: 0,
        // paddingBottom: 0,
        // paddingLeft: -3
    }
};

Select.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    marginTop: PropTypes.number,
    pickerValues: PropTypes.object,
}