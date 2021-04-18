import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, Pressable } from 'react-native'
import { Header, Button, Input, ListItem, Avatar, Image, SearchBar } from 'react-native-elements'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons';

const ListNPP = ({ navigation }) => {
    const [list, setList] = useState([]);

    const [hidenThem, setHidenThem] = useState(false)

    const [maNPP, setmaNPP] = useState()
    const [tenNPP, settenNPP] = useState()
    const [diachiNPP, setdiachiNPP] = useState()
    const [sdtNPP, setsdtNPP] = useState()
    const [emailNPP, setemailNPP] = useState()

    const [Textsearch, setTextSearch] = useState('')
    const [newList, setNewList] = useState([])




    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        FilterData()
    }, [Textsearch])

    const getData = () => {
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
            setList(array);
        })
    }

    const onPressThemNPP = () => {
        firebase.database().ref('Nhaphanphoi/' + maNPP).set({
            maNPP: maNPP,
            tenNPP: tenNPP,
            diachiNPP: diachiNPP,
            sdtNPP: sdtNPP,
            emailNPP: emailNPP,
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
            navigation.navigate('Nppchitiet', { item: item })
        }
        return (
            <Pressable onPress={() => onPressSanPham()}>

                <ListItem bottomDivider>
                    <Image
                        source={{ uri: "https://i.pinimg.com/originals/ff/ef/33/ffef334063c5edf8192ca0961ac10f28.png" }}
                        style={{ width: 50, height: 50 }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{item.tenNPP}</ListItem.Title>
                        <ListItem.Subtitle>{item.emailNPP}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </Pressable>
        )
    }


    const FilterData = () => {
        setNewList(list.filter((list) => list.tenNPP.toLowerCase().includes(Textsearch.toLowerCase())))
    }





    return (
        <View style={styles.container}>

            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'QUẢN LÝ NHA PHAN PHOI', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', }}
            />

            {
                !hidenThem ? (
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={(text) => setTextSearch(text)}
                        value={Textsearch}
                        platform="ios"

                    />
                ) : (
                    <View>

                    </View>
                )
            }

            {
                hidenThem ? (
                    <View>
                        <Input
                            placeholder="Ma nha phan phoi"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setmaNPP(value)}
                        />
                        <Input
                            placeholder="Ten nha phan phoi"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => settenNPP(value)}
                        />
                        <Input
                            placeholder="dia chi nha phan phoi"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setdiachiNPP(value)}
                        />
                        <Input
                            placeholder="so dien thoai nha phan phoi"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setsdtNPP(value)}
                        />
                        <Input
                            placeholder="so dien thoai nha phan phoi"
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            onChangeText={value => setemailNPP(value)}
                        />


                        <Button
                            onPress={() => onPressThemNPP()}
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
                            title="Them Nha Phan phoi"
                        />
                        {
                            Textsearch == '' ? (
                                <FlatList
                                    keyExtractor={(item) => item?.id + '_'}
                                    data={list}
                                    renderItem={renderItem}
                                />
                            ) :
                                (<FlatList
                                    keyExtractor={(item) => item?.id + '_'}
                                    data={newList}
                                    renderItem={renderItem}
                                />)
                        }

                    </View>

                )
            }


        </View>
    )
}

export default ListNPP

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,254,251,1)',
        flex: 1
    },
})
