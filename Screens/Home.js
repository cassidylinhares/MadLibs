import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import themes from "../../consts/themes "
import COLORS from "../../consts/colors"

const Home = () => {
    return (
        <SafeAreaView style={style.area}>
            <FlatList numColumns={2} data={themes}/>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    area: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,

    }
})
