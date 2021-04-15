import { useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Image, Input, Button } from 'react-native-elements'
import firebase from 'firebase'

const Nhanvienchitiet = ({ navigation }) => {
    const { params } = useRoute()


    const [tenNV, settenNV] = useState()
    const [gioitinhNV, setgioitinhNV] = useState()
    const [diachiNV, setdiachiNV] = useState()
    const [sdtNV, setsdtNV] = useState()

    const onPressSuaNV = () => {

        firebase.database().ref('Nhanvien/' + params.item.maNV).set({
            maNV: params.item.maNV,
            tenNV: tenNV || params.item.tenNV,
            gioitinhNV: gioitinhNV || params.item.gioitinhNV,
            diachiNV: diachiNV || params.item.diachiNV,
            sdtNV: sdtNV || params.item.sdtNV,
        }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Sua thanh cong')
                navigation.goBack()
            }
        });
    }

    const onPressXoaNV = () => {
        firebase.database().ref('Nhanvien/' + params.item.maNV).remove((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Xoa thanh cong')
                navigation.goBack()

            }
        })
    }





    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'SAN PHAM CHI TIET', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', }}
            />
            <View style={styles.avatar}>
                <Image
                    loading
                    source={{ uri: params.item.AnhSP ? params.item.AnhSP : "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" }}
                    style={{ width: 150, height: 150, }}

                />
            </View>
            <View>
                <Input
                    placeholder={params.item.maNV}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                <Input
                    placeholder={params.item.tenNV}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={value => settenNV(value)}

                />
                <Input
                    placeholder={params.item.diachiNV}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={value => setdiachiNV(value)}

                />
                <Input
                    placeholder={params.item.gioitinhNV}
                    onChangeText={value => setgioitinhNV(value)}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                <Input
                    placeholder={params.item.sdtNV}
                    onChangeText={value => setsdtNV(value)}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />

            </View>
            <View>
                <Button
                    onPress={() => onPressSuaNV()}
                    title="Sua nhan vien"
                    type="solid"
                />
                <Button
                    onPress={() => onPressXoaNV()}

                    title="Xoa nhan vien"
                    type="outline"
                />

            </View>

        </View>
    )
}

export default Nhanvienchitiet

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,254,251,1)',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    avatar: {
        justifyContent: 'center',
        alignSelf: 'center'
    }
})
