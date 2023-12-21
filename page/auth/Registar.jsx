import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity ,ToastAndroid} from 'react-native'
import React, { useContext, useState } from 'react'
// import TextInput from '../../component/TextInput'
import { authstyles } from './AuthStule'
import { AuthContext } from '../../src/context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import loginController from '../../hooks/controller/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";

const Registar = ({ navigation }) => {

    const [userMobile, setUserMobile] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userRefCode, setRefCode] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const { register } = loginController();

    const handleMobNO = (text) => {
        const regex = /^[0-9]{0,11}$/;
        if (regex.test(text)) {
            setUserMobile(text);
        }
    };

    const handlerefNO = (text) => {
        const regex = /^[0-9]{0,10}$/;
        if (regex.test(text)) {
            setRefCode(text);
        }
    };

    const registeruser = async () => {
        setIsLoading(true);
        await register(userName, userMobile, userPassword, userRefCode).then(res => {
            const response = res.data
            console.log(response)
            setUserInfo(response);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            if (response.status == false) {
                ToastAndroid.showWithGravity(
                    `${response.massage}`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                showMessage({
                    message: "invalid input",
                    type: "danger",
                    autoHide: true,
                    duration: 3000,
                    position: "top",
                    style: {
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    titleStyle: {
                        textAlign: 'center',
                    },
                    descriptionStyle: {
                        textAlign: 'center',
                    },
                });
                setIsLoading(false);
            } else {
                showMessage({
                    message: "Registration successful",
                    type: "success",
                    autoHide: true,
                    duration: 3000,
                    position: "top",
                    style: {
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    titleStyle: {
                        textAlign: 'center',
                    },
                    descriptionStyle: {
                        textAlign: 'center',
                    },
                });
                setIsLoading(false);
                navigation.navigate('Login');
            }
        }).catch(er => {
            console.log(er);
            showMessage({
                message: "Invalid Input please fill valid input !",
                type: "danger",
                autoHide: true,
                duration: 3000,
                position: "top",
                style: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                titleStyle: {
                    textAlign: 'center',
                },
                descriptionStyle: {
                    textAlign: 'center',
                },
            });
            setIsLoading(false);
        })
    }


    const screenWidth = Dimensions.get('window').width;
    const logoWidth = screenWidth * 1.15; // 80% of the screen width
    const logoHeight = (logoWidth * 1.15) / 2; // Assuming the logo's aspect ratio is 3:1
    return (
        <>
            <KeyboardAwareScrollView style={{ backgroundColor: "red", }}>
                <View style={authstyles.main}>
                    <View style={authstyles.container}>
                        <Image source={require('../../assets/logo/Star-Line__2.png')} style={{ width: logoWidth, height: logoHeight }} resizeMode="contain" />
                    </View>
                    <View style={authstyles.container2}>
                        <View style={authstyles.texinput}>
                            <View style={authstyles.inpCon}>
                                <Text style={authstyles.label}>Name</Text>
                                <View style={authstyles.inputContainer}>
                                    <TextInput
                                        style={authstyles.input}
                                        placeholder={"Full Name"}
                                        color="#fff"
                                        value={userName}
                                        maxLength={40}
                                        onChangeText={(text) => {
                                            setUserName(text)
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={authstyles.inpCon}>
                                <Text style={authstyles.label}>Mobile No</Text>
                                <View style={authstyles.inputContainer}>
                                    <TextInput
                                        style={authstyles.input}
                                        placeholder={"Mobile No"}
                                        maxLength={11}
                                        value={userMobile}
                                        onChangeText={handleMobNO}
                                        color="#fff"
                                    />
                                </View>
                            </View>
                            <View style={authstyles.inpCon}>
                                <Text style={authstyles.label}>Password</Text>
                                <View style={authstyles.inputContainer}>
                                    <TextInput
                                        style={authstyles.input}
                                        placeholder={"*******"}
                                        color="#fff"
                                        secureTextEntry={true}
                                        value={userPassword}
                                        maxLength={30}
                                        onChangeText={(text) => {
                                            setUserPassword(text)
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={authstyles.inpCon}>
                                <Text style={authstyles.label}>Referral Code</Text>
                                <View style={authstyles.inputContainer}>
                                    <TextInput
                                        style={authstyles.input}
                                        placeholder={"Enter Referral Code"}
                                        value={userRefCode}
                                        onChangeText={handlerefNO}
                                        color="#fff"
                                        keyboardType='number-pad'
                                    />
                                </View>
                            </View>

                            <View style={authstyles.inpCon}>
                                <TouchableOpacity style={authstyles.button} onPress={registeruser}>
                                    <Text style={authstyles.btn_text}>Sing Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={authstyles.inpCon}><Text style={authstyles.head_text}>Don't have an account</Text></View>
                            <View style={authstyles.inpCon}>
                                <TouchableOpacity style={authstyles.button} onPress={() => navigation.navigate('Login')}>
                                    <Text style={authstyles.btn_text}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}

export default Registar

const styles = StyleSheet.create({

})