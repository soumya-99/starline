import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
// import TextInput from '../../component/TextInput'
import { authstyles } from './AuthStule'
import { AuthContext } from '../../src/context/AuthContext';

const Login = ({ navigation }) => {


    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const { isLoading, loginUser } = useContext(AuthContext);


    const screenWidth = Dimensions.get('window').width;

    const logoWidth = screenWidth * 1.15; // 80% of the screen width
    const logoHeight = (logoWidth * 1.15) / 2; // Assuming the logo's aspect ratio is 3:1

    function handleLogin() {
        if (userEmail.length > 12) {
            return  ToastAndroid.showWithGravity(
                'Please Enter a Correct Mobile Number',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
        }
        loginUser(userEmail, userPassword);
    }
    return (
        <>
            <View style={authstyles.main}>
                <View style={authstyles.container}>
                    <Image source={require('../../assets/logo/Star-Line__2.png')} style={{ width: logoWidth, height: logoHeight }} resizeMode="contain" />
                </View>


                <View style={authstyles.container2}>

                    <View style={authstyles.texinput}>

                        <View style={authstyles.inpCon}>
                            <Text style={authstyles.label}>Mobile No</Text>
                            <View style={authstyles.inputContainer}>
                                <TextInput
                                    style={authstyles.input}
                                    placeholder={"Mobile No"}
                                    color="#fff"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    autoCompleteType="Mobile NO"
                                    textContentType="emailAddress"
                                    maxLength={11}
                                    onChangeText={(text) => {
                                        setUserEmail(text)
                                    }}
                                    value={userEmail}

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
                                    onChangeText={(text) => {
                                        setUserPassword(text)
                                    }}
                                    value={userPassword}
                                />
                            </View>
                        </View>

                        <View style={authstyles.inpCon}>
                            <TouchableOpacity style={authstyles.button} onPress={() => {
                                // Alert.alert(BASE_URL);
                                handleLogin()


                            }}>
                                <Text style={authstyles.btn_text}>Sing In</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={authstyles.inpCon}><Text style={authstyles.head_text}>Don't have an account</Text></View>


                        <View style={authstyles.inpCon}>
                            <TouchableOpacity style={authstyles.button} onPress={() => navigation.navigate('Registar')}>
                                <Text style={authstyles.btn_text}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </View>
        </>
    )
}

export default Login

const styles = StyleSheet.create({


})