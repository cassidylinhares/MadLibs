import React from 'react';
import * as Speech from 'expo-speech';
import { saveStory } from '../firebase';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//route has story and blanks
const Result = ({navigation, route}) => {
    const story = route.params.story;
    const blanks = route.params.blanks;

    const fillStory = () => {
        let words = story.story.split(' ');
        let blanksTemp = [...blanks];

        for(let i=0; i < words.length; i++){
            if(words[i].includes('_')) {
                let filled = words[i].replace('_', blanksTemp.shift());
                words[i] = filled;
            }
        }

        return words.join(' ');
    }

    const saveBtnHandler = () => {
        saveStory(story, blanks)
        .then(res => console.log(res));
    }

    const backBtnHandler = () => {
        navigation.goBack()
    }

    const repeatBtnHandler = () => {
        Speech.speak(fillStory());
    }

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack().goBack()}>
                <Icon style={{marginTop: 30}} name="arrow-back" size={28}/>
            </TouchableOpacity>
            <ScrollView style={styles.detailsContainer}>
                <View style={styles.title}>
                    <Text style={{color: 'grey', fontSize:16, lineHeight: 22, marginTop: 8}}>{story?.title}</Text>
                </View>
                <View style={styles.body}>
                    <Text>{fillStory()}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={repeatBtnHandler}>
                    <Text style={styles.btnText}>Play Audio</Text>
                </TouchableOpacity>
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
