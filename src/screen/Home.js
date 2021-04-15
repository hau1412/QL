import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements';
import { Header } from 'react-native-elements'






const Home = ({ navigation }) => {


    const onPressLitSP = () => {
        navigation.navigate('ListSP')
    }

    const onPressListNV = () => {
        navigation.navigate('ListNV')
    }

    const onPressListNPP = () => {
        navigation.navigate('ListNPP')

    }

    const onPressQLKho = () => {

    }
    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'QUẢN LÝ CỬA HÀNG', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', }}
            />
            <Button
                onPress={() => onPressLitSP()}
                title="Quản lý sản phẩm"
                style={{
                    marginTop: 20
                }}
            />
            <Button
                onPress={() => onPressListNV()}

                title="Quản lý nhân viên"
                style={{
                    marginTop: 20
                }}
            />
            <Button
                onPress={() => onPressListNPP()}

                title="Quản lý nhà phân phối" style={{
                    marginTop: 20
                }}
            />
            <Button
                onPress={() => onPressQLKho()}

                title="kho hàng" style={{
                    marginTop: 20
                }}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,254,251,1)',
        flex: 1
    }
})
