import { useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Image, Input, Button } from 'react-native-elements'
import firebase from 'firebase'

const SanphamChitiet = ({ navigation }) => {
    const { params } = useRoute()
    console.log(params.item.AnhSP)


    const [tenSP, settenSP] = useState()
    const [LoaiSP, setLoaiSP] = useState()
    const [NxsSP, setNxsSP] = useState()
    const [GiabanSP, setGiabanSP] = useState()
    const [AnhSP, setAnhSP] = useState()


    const onPressSuaSP = () => {
        firebase.database().ref('Sanpham/' + params.item.maSP).set({
            maSP: params.item.maSP,
            tenSP: tenSP || params.item.tenSP,
            LoaiSP: LoaiSP || params.item.LoaiSP,
            NxsSP: NxsSP || params.item.NxsSP,
            GiabanSP: GiabanSP || params.item.GiabanSP,
            AnhSP: AnhSP || params.item.AnhSP,
        }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Sua thanh cong')
                navigation.goBack()
            }
        });
    }

    const onPressXoaSP = () => {
        firebase.database().ref('Sanpham/' + params.item.maSP).remove((err) => {
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
            <Image
                loading
                source={{ uri: params.item.AnhSP ? params.item.AnhSP : "https://i.pinimg.com/originals/a6/ab/33/a6ab33c80581e44296da5d65b5f9acda.png" }}
                style={{ width: 100, height: 100, }}

            />
            <View>
                <Input
                    placeholder={params.item.maSP}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                <Input
                    placeholder={params.item.tenSP}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={value => settenSP(value)}

                />
                <Input
                    placeholder={params.item.LoaiSP}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={value => setLoaiSP(value)}

                />
                <Input
                    placeholder={params.item.NxsSP}
                    onChangeText={value => setNxsSP(value)}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                <Input
                    placeholder={params.item.GiabanSP}
                    onChangeText={value => setGiabanSP(value)}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                <Input
                    placeholder={params.item.AnhSP}
                    onChangeText={value => setAnhSP(value)}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
            </View>
            <View>
                <Button
                    onPress={() => onPressSuaSP()}
                    title="Sua san pham"
                    type="solid"
                />
                <Button
                    onPress={() => onPressXoaSP()}

                    title="Xoa san pham"
                    type="outline"
                />

            </View>

        </View>
    )
}

export default SanphamChitiet

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,254,251,1)',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    body: {

    }
})
