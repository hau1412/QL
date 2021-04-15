import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, FlatList } from 'react-native'
import { Header, Button, Input, ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';


const ListSP = ({ navigation }) => {


    const [list, setList] = useState([]);



    const [hidenThem, setHidenThem] = useState(false)

    const [maSP, setmaSP] = useState()
    const [tenSP, settenSP] = useState()
    const [LoaiSP, setLoaiSP] = useState()
    const [NxsSP, setNxsSP] = useState()
    const [GiabanSP, setGiabanSP] = useState()
    const [AnhSP, setAnhSP] = useState()

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
            setList(array);
        })
    }

    const onPressThemSP = () => {
        firebase.database().ref('Sanpham/' + maSP).set({
            maSP: maSP,
            tenSP: tenSP,
            LoaiSP: LoaiSP,
            NxsSP: NxsSP,
            GiabanSP: GiabanSP,
            AnhSP: AnhSP,
        }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('them thanh cong')
                setHidenThem(false)
            }
        });
    }
    const onPressSet = () => {
        setHidenThem(true)
    }

    const renderItem = ({ item }) => {
        console.log('izsdasd', item)
        return (
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.TenSP}</ListItem.Title>
                    <ListItem.Subtitle>{item.GiabanSP}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )
    }
    return (
        <View style={styles.container}>

            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'QUẢN LÝ SẢN PHẨM', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', }}
            />

            {
                hidenThem ? (
                    <View>
                        <Input
                            placeholder="Ma san pham"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setmaSP(value)}
                        />
                        <Input
                            placeholder="Ten san pham"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => settenSP(value)}
                        />
                        <Input
                            placeholder="Loai san pham"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setLoaiSP(value)}
                        />
                        <Input
                            placeholder="Nha san xuat san pham"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setNxsSP(value)}
                        />
                        <Input
                            placeholder="Gia ban san pham"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setGiabanSP(value)}
                        />

                        <Input
                            placeholder="Link hinh anh"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setAnhSP(value)}
                        />

                        <Button
                            onPress={() => onPressThemSP()}
                            icon={
                                <Icon
                                    name="create-outline"
                                    size={20}
                                    color="white"
                                />
                            }
                            title="Them"
                        />

                    </View>


                ) : (
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={() => onPressSet()}
                            icon={
                                <Icon
                                    name="create-outline"
                                    size={20}
                                    color="white"
                                />
                            }
                            title="Them San Pham"
                        />
                        <FlatList
                            keyExtractor={(item) => item?.id + '_'}
                            data={list}
                            renderItem={renderItem}
                        />

                    </View>

                )
            }


        </View>
    )
}

export default ListSP

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,254,251,1)',
        flex: 1
    },
    input: {
        color: 'red'
    }
})
