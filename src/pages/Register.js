import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, Alert,CheckBox, ActivityIndicator, AsyncStorage
} from 'react-native';
import Environment from '../../environment';

import {Input, Button, Logo, Heading, BackgroundWrapper, AlertStatus} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {getPlatformValue} from '../utils';

export default class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        loading: false,
        message: '',
        animation: {
            headerPositionTop: new Animated.Value(-148),
            formPositionLeft: new Animated.Value(614),
            buttonPositionTop: new Animated.Value(1354)
        }
    }

    handleChangeInput(stateName, text) {
        this.setState({
            [stateName]: text
        })
    }

    handleRegister() {
        // Alert.alert(
        //     'Button press',
        //     'Created user'
        // )

       this.setState({ loading: true, message: '' });  

        var params = {
            login_name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            chk_newsletters: 0,
            ddlPlan: 28
          
        };
         
        if(this.state.username == '' || this.state.email == '' || this.state.password =='')
        {
            this.setState({ message: "Please fill in all fields"});
            this.setState({ loading: false });
            return false;
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email) === false)
        {
            this.setState({ message: "Invalid email address"});
            this.setState({ loading: false });
            return false;
        }

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          
        }
        formBody = formBody.join("&");

        var proceed = false;
        console.log(formBody);

    
        fetch(Environment.CLIENT_REGISTER_API, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'device_id':'1234',
                    'device_type':'android',
                 },
                body: formBody
        })
          
        .then((response) => response.json())

        .then((responseData) => {
            //console.log(responseData);console.log(responseData.data.data.auth_key+" )) "+responseData.data.data.userid);return false;
            if(responseData.data.length===0) {
                
                this.setState({ message: responseData.error})
                this.setState({ loading: false });
                
            }
             else {
                this.saveItem('auth_key', responseData.data.data.auth_key);
                this.saveItem('userid', responseData.data.data.userid);
                Actions.profile();
            }
       
    })
    .done();
    }

    async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

    unmountComponent(callback) {
        const timing = Animated.timing;
        Animated.parallel([
            timing(this.state.animation.headerPositionTop, {
                toValue: -148,
                duration: 400,
                delay: 100
            }),
            timing(this.state.animation.formPositionLeft, {
                toValue: 614,
                duration: 500,
                delay: 120
            }),
            timing(this.state.animation.buttonPositionTop, {
                toValue: 1354,
                duration: 400,
                delay: 130
            })
        ]).start(callback);
    }

    handleBack() {
        this.unmountComponent(() => {
            Actions.pop();
        })
    }

    handleLogin() {
        this.unmountComponent(() => {
            Actions.login();
        })
    }

    componentDidMount() {
        Animated.timing(this.state.animation.headerPositionTop, {
            toValue: 0,
            duration: 725,
            delay: 100
        }).start();
        Animated.timing(this.state.animation.formPositionLeft, {
            toValue: 0,
            duration: 700,
            delay: 120
        }).start();
        Animated.timing(this.state.animation.buttonPositionTop, {
            toValue: 0,
            duration: 600,
            delay: 130
        }).start();
    }

    render() {
        return <BackgroundWrapper transparent iconMenu  onPressIcon={this.handleBack.bind(this)} style={{marginTop:15}}>
            <View style={loginStyle.loginContainer}>
                <Animated.View style={{position: 'relative', top: this.state.animation.headerPositionTop}}>
                    <Heading color="#ffffff" textAlign="center">
                        {'Sign up'}
                    </Heading>
                </Animated.View>
                <Logo marginTop={25}/>
                <View style={loginStyle.formContainer}>
                    <Animated.View style={{position: 'relative', left: this.state.animation.formPositionLeft}}>
                        <Input label="Username"
                               icon={<Icon name="user"/>}
                               value={this.state.username}
                               onChange={this.handleChangeInput.bind(this, 'username')}
                        />
                        <Input label="Email"
                               icon={<Icon name="envelope-o"/>}
                               value={this.state.email}
                               marginTop={23}
                               onChange={this.handleChangeInput.bind(this, 'email')}
                        />
                        <Input label="Password"
                               icon={<Icon name="key"/>}
                               value={this.state.password}
                               marginTop={23}
                               onChange={this.handleChangeInput.bind(this, 'password')}
                               secureTextEntry
                        />
                        
                         {!!this.state.message && (
                    <Text
                        style={{fontSize: 16, padding: 5, textAlign:"center"}}>
                        {this.state.message}
                    </Text>
                )}

                {this.state.loading && <ActivityIndicator animating = {this.state.loading}
                    color = '#FFF'
                    size = "small"
                    style = {loginStyle.activityIndicator}/>}

                    </Animated.View>
                    <Animated.View style={{position: 'relative', top: this.state.animation.buttonPositionTop}}>
                        <Button marginTop={getPlatformValue('android',25, 38)} width={200} onPress={this.handleRegister.bind(this)}>
                            Create
                        </Button>
                    </Animated.View>
                </View>
            </View>
            {/* <AlertStatus textHelper="You're ready account" textAction="Login"
                         onPressAction={this.handleLogin.bind(this)}></AlertStatus>*/}
        </BackgroundWrapper>
    }
}

const loginStyle = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: getPlatformValue('android', 10, 30),
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: getPlatformValue('android', 5, 34)
        //backgroundColor: '#ffffff'
    },
    activityIndicator: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 25
   }
})
