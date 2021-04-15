import React from 'react'
import { Button, Input, SocialIcon } from 'react-native-elements';

import { Alert, LogBox, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { App } from '../container/App'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


function Login({ signIn }) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    const a = () => {
        if (username == '' && password == '') {
            signIn()
        } else {
            Alert.alert('Sai tai khoan hoac mat khau')
        }
    }



    return (
        <SafeAreaView>
            <Input
                placeholder="Tài khoản"
                style={styles}
                onChangeText={value => setUsername(value)}
            />


            <Input placeholder="Mật khẩu" secureTextEntry={true}
                onChangeText={value => setPassword(value)} />

            {/* <Button title="Sign in" onPress={() => signIn()} /> */}

            <Button
                onPress={() => a()}
                title="Đăng nhập"
            />

        </SafeAreaView>
    );
}

export default Login

const styles = StyleSheet.create({})
