import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'

const Play = ({navigation, route}) => {
    const theme = route.params;

    const handlePlayButton = () => {
        navigation.navigate("Game", theme.id);
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#CBC3E3"}}>
            <View style={styles.header}>
                <Icon style={{marginTop: 30}}name="arrow-back" size={28} onPress={()=>navigation.goBack()}/>
            </View>
            <View style={styles.imageContainer}>
                <Image  source={theme.img} style={{ flex: 1, width: 200, height: 225}}/>
            </View>
            <View style={styles.detailsContainer}>
                <View style={{paddingHorizontal: 20, marginTop: 10}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Tease</Text>
                    <Text style={{color: 'grey', fontSize:16, lineHeight: 22, marginTop: 8}}>{theme.about}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={handlePlayButton}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>PLAY</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}
const styles= StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    detailsContainer: {
        flex: 0.55,
        height: 100,
        backgroundColor: "#F8F8F8",
        marginHorizontal: 15,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30
    },
    btn: {
        marginTop: 50,
        width: 290,
        marginHorizontal: 20,
        height: 70,
        backgroundColor: '#5D3FD3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,

    }
});

export default Play;

