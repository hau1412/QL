import React, { useState, createContext } from 'react';
import firebase, { auth } from 'firebase';
import { ToastAndroid, , Alert } from 'react-native';

export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    register: () => { },
    update: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );


    return (
        <AuthContext.Provider
            value={{
                user,
                login: async (email, password) => {
                    console.log(email, password);
                    await firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password)
                        .then(async res => {
                            let data;
                            await firebase
                                .database()
                                .ref('users/')
                                .orderByChild('email')
                                .equalTo(email)
                                .once('value', snap => (data = snap.val()));

                            const userData = data[Object.keys(data)[0]];
                            setUser({
                                name: userData.name,
                                phonenumber: userData.phonenumber,
                                email: email,
                                password: password,
                                id: userData.id,
                            });
                        })
                        .catch(error => {
                            const { code, message } = error;
                            // alert(`${message}`)
                            if (email != true || password != true) {
                                alert('Wrong email or password . Please try again !!');
                                return;
                            }
                        });
                },
                register: async (email, password) => {
                    await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(user => {
                            setUser({ username: email });
                            console.log('Register success!');
                            ToastAndroid.show('Register success!', ToastAndroid.SHORT);
                        })
                        .catch(error => {
                            const { code, message } = error;
                            console.log('Error: ' + message);
                            ToastAndroid.show('Register fail!', ToastAndroid.SHORT);
                        });
                },
                update: async numberOfPhone => {
                    var postData = {
                        name: user.name,
                        password: user.password,
                        id: user.id,
                        email: user.email,
                        phonenumber: numberOfPhone,
                    };
                    var updates = {};
                    setUser(postData);

                    updates['/users/' + user.id] = postData;
                    firebase
                        .database()
                        .ref()
                        .update(updates);
                },
                logout: async () => {
                    setUser(null);
                    ToastAndroid.show('Logout!', ToastAndroid.SHORT);
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};