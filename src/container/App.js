import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase'

import Login from '../screen/Login';
import Home from '../screen/Home';
import firebaseConfig from '../../firebaseConfig';
import ListNV from '../screen/ListNV';
import ListSP from '../screen/ListSP';
import ListNPP from '../screen/ListNPP';
import QLKho from '../screen/QLKho';

const AuthContext = React.createContext();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('connect thanh cong toi firebase');
}


const translateXOptionsScreen = {
    headerShown: false,
    cardStyle: { backgroundColor: 'rgba(255,255,255,1)' },
    cardOverlayEnabled: false,
    gestureEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
            transform: [
                {
                    translateX: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }),
                },
            ],
            opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
        },
        overlayStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
        },
    }),
};



const initialRoute = {
    statusBarHidden: true,
};

const modalOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: 'rgba(0,0,0,0)' },
    cardOverlayEnabled: true,
    gestureEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
            }),
        },
        overlayStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.1],
                extrapolate: 'clamp',
            }),
        },
    }),
};



const BottomTab = () => {
    return (
        <Tab.Navigator
            lazy={true}
            headerMode={'none'}
            initialRoute={initialRoute}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Setting" component={Home} />
        </Tab.Navigator>
    );
};




function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);



    return <Login signIn={signIn} setUsername={setUsername} setPassword={setPassword} />
    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
        </View>
    );
}





const StackScreenCompo = () => {
    return (
        <Stack.Navigator
            // headerMode={'none'}
            screenOptions={translateXOptionsScreen}
            initialRoute={initialRoute}
            initialRouteName={'BottomTab'}
        >
            <Stack.Screen name={'BottomTab'} component={BottomTab} />
            <Stack.Screen name={'ListSP'} component={ListSP} />
            <Stack.Screen name={'ListNV'} component={ListNV} />
            <Stack.Screen name={'ListNPP'} component={ListNPP} />
            <Stack.Screen name={'QLKho'} component={QLKho} />

        </Stack.Navigator>
    );
};



const App = () => {


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

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });


            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer independent={true} >
                <Stack.Navigator
                    // mode={'modal'}
                    // headerMode={'none'}
                    initialRoute={initialRoute}
                    screenOptions={modalOptions}
                    initialRouteName={'StackScreen'}>
                    {state.userToken == null ? (
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                    ) : (
                        <Stack.Screen
                            name={'StackScreen'}
                            component={StackScreenCompo}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>

        </AuthContext.Provider>
    );
}

export default App

const styles = StyleSheet.create({})
