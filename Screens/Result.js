import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native';

//route has story and blanks
const Result = ({navigation, route}) => {
    console.log(route)
    const [story, setStory] = useState(route.params.story);
    const [blanks, setBlanks] = useState(route.params.blanks);

    const fillStory = () => {
        const words = story?.story?.split(' ');
        for(let i=0; i< blanks.length; i++){
            if(words[i].includes('_')) {
                let filled = words[i].replace('_', blanks[i]);
                words[i] = filled;
            }
        }
        return words.join(' ');
    }

    const saveBtnHandler = () => {}
    const backBtnHandler = () => {}

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView style={styles.detailsContainer}>
                <View style={styles.title}>
                    <Text style={{color: 'grey', fontSize:16, lineHeight: 22, marginTop: 8}}>{story?.title}</Text>
                </View>
                <View style={styles.body}>
                    <Text>{fillStory()}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={saveBtnHandler}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={backBtnHandler}>
                    <Text style={styles.btnText}>Play Again</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Result;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1, 
        backgroundColor: "#CBC3E3"
    },
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flex: 0.15,
        marginTop: 5,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',

    },
    detailsContainer: {
        flex: 1,
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

    },
    btnText: {
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold',
    },
});
