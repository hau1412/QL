import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, Pressable } from 'react-native'
import { Header, Button, Input, ListItem, Avatar, Image } from 'react-native-elements'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons';


const ListNV = ({ navigation }) => {
    const [list, setList] = useState([]);

    const [hidenThem, setHidenThem] = useState(false)

    const [maNV, setmaNV] = useState()
    const [tenNV, settenNV] = useState()
    const [gioitinhNV, setgioitinhNV] = useState()
    const [diachiNV, setdiachiNV] = useState()
    const [sdtNV, setsdtNV] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
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
            setList(array);
        })
    }


    const onPressThemNV = () => {
        firebase.database().ref('Nhanvien/' + maNV).set({
            maNV: maNV,
            tenNV: tenNV,
            gioitinhNV: gioitinhNV,
            diachiNV: diachiNV,
            sdtNV: sdtNV,
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
        const onPressSanPham = () => {
            navigation.navigate('Nhanvienchitiet', { item: item })
        }
        return (
            <Pressable onPress={() => onPressSanPham()}>

                <ListItem bottomDivider>
                    <Image
                        source={{ uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" }}
                        style={{ width: 50, height: 50 }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{item.tenNV}</ListItem.Title>
                        <ListItem.Subtitle>{item.sdtNV}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </Pressable>
        )
    }



    return (
        <View style={styles.container}>

            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'QUẢN LÝ NHAN VIEN', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', }}
            />

            {
                hidenThem ? (
                    <View>
                        <Input
                            placeholder="Ma nhan vien"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setmaNV(value)}
                        />
                        <Input
                            placeholder="Ten nhan vien"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => settenNV(value)}
                        />
                        <Input
                            placeholder="gioi tinh nhan vien"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setgioitinhNV(value)}
                        />
                        <Input
                            placeholder="Nha san xuat nhan vien"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setdiachiNV(value)}
                        />
                        <Input
                            placeholder="so dien thoai"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setsdtNV(value)}
                        />


                        <Button
                            onPress={() => onPressThemNV()}
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
                            title="Them Nhan vien"
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

export default ListNV

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,254,251,1)',
        flex: 1
    },
})
