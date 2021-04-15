import { useRoute } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Header, Image, Input, Button, Text } from 'react-native-elements'
import firebase from 'firebase'
const QLKho = ({ navigation }) => {
    const [listhang, setListhang] = useState([]);

    const [listhang1, setListhang1] = useState([]);


    const [listhang2, setListhang2] = useState([]);



    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        firebase.database().ref('Sanpham/').on('value', (snapshot) => {
            var array = [];
            snapshot.forEach((childSnapshot) => {
                array.push({
                    id: childSnapshot.key,
                    maSP: childSnapshot.val().maSP,
                    tenSP: childSnapshot.val().tenSP,
                    LoaiSP: childSnapshot.val().LoaiSP,
                    NxsSP: childSnapshot.val().NxsSP,
                    GiabanSP: childSnapshot.val().GiabanSP,
                    AnhSP: childSnapshot.val().AnhSP,
                });
            });
            setListhang(array);
        })

        firebase.database().ref('Nhanvien/').on('value', (snapshot) => {
            var array = [];
            snapshot.forEach((childSnapshot) => {
                array.push({
                    id: childSnapshot.key,
                    maNV: childSnapshot.val().maNV,
                    tenNV: childSnapshot.val().tenNV,
                    gioitinhNV: childSnapshot.val().gioitinhNV,
                    diachiNV: childSnapshot.val().diachiNV,
                    sdtNV: childSnapshot.val().sdtNV,
                });
            });
            setListhang1(array);
        })


        firebase.database().ref('Nhaphanphoi/').on('value', (snapshot) => {
            var array = [];
            snapshot.forEach((childSnapshot) => {
                array.push({
                    id: childSnapshot.key,
                    maNPP: childSnapshot.val().maNPP,
                    tenNPP: childSnapshot.val().tenNPP,
                    diachiNPP: childSnapshot.val().diachiNPP,
                    sdtNPP: childSnapshot.val().sdtNPP,
                    emailNPP: childSnapshot.val().emailNPP,
                });
            });
            setListhang2(array);
        })



    }


    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Quan li kho hang', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', }}
            />
            <Text h3>{`Tổng sản phầm: ${listhang?.length}`}</Text>
            <Button
                title="xem chi tiet"
                type="outline"
                onPress={() => navigation.navigate('ListSP')}
            />

            <Text h3>{`Tổng nhân viên: ${listhang1?.length}`}</Text>
            <Button
                title="xem chi tiet"
                type="outline"
                onPress={() => navigation.navigate('ListNV')}


            />
            <Text h3>{`Tổng nhà phân phối: ${listhang2?.length}`}</Text>
            <Button
                title="xem chi tiet"
                type="outline"
                onPress={() => navigation.navigate('ListNPP')}

            />


        </View>
    )
}

export default QLKho

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,254,251,1)',
        justifyContent: 'center',
        alignSelf: 'center',
    },
})
