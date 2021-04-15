import { useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Image, Input, Button } from 'react-native-elements'
import firebase from 'firebase'

const Nppchitiet = ({ navigation }) => {

    const { params } = useRoute()


    const [tenNPP, settenNPP] = useState()
    const [diachiNPP, setdiachiNPP] = useState()
    const [sdtNPP, setsdtNPP] = useState()
    const [emailNPP, setemailNPP] = useState()

    const onPressSuaNPP = () => {

        firebase.database().ref('Nhaphanphoi/' + params.item.maNPP).set({
            maNPP: params.item.maNPP,
            tenNPP: tenNPP || params.item.tenNPP,
            diachiNPP: diachiNPP || params.item.diachiNPP,
            sdtNPP: sdtNPP || params.item.sdtNPP,
            emailNPP: emailNPP || params.item.emailNPP,
        }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Sua thanh cong')
                navigation.goBack()
            }
        });
    }

    const onPressXoaNPP = () => {
        firebase.database().ref('Nhaphanphoi/' + params.item.maNPP).remove((err) => {
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
                    placeholder={params.item.maNPP}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                <Input
                    placeholder={params.item.tenNPP}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={value => settenNPP(value)}

                />
                <Input
                    placeholder={params.item.diachiNPP}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={value => setdiachiNPP(value)}

                />
                <Input
                    placeholder={params.item.sdtNPP}
                    onChangeText={value => setsdtNPP(value)}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                <Input
                    placeholder={params.item.emailNPP}
                    onChangeText={value => setemailNPP(value)}
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />

            </View>
            <View>
                <Button
                    onPress={() => onPressSuaNPP()}
                    title="Sua nha phan phoi"
                    type="solid"
                />
                <Button
                    onPress={() => onPressXoaNPP()}

                    title="Xoa nha phan phoi"
                    type="outline"
                />

            </View>

        </View>
    )
}

export default Nppchitiet

const styles = StyleSheet.create({})
