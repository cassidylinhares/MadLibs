import React from 'react';
import * as Speech from 'expo-speech';
import { saveStory } from '../firebase';
import { fillStory } from '../consts/common';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//route has story and blanks
const Result = ({navigation, route}) => {
    const story = route.params.story; //story from the db
    const blanks = route.params.blanks; //users answers
    const fromProfile = route.params.fromSaved; //check if story is a saved story or new story

    //back button 
    const backBtnHandler = () => {
        Speech.stop(); //stop any speech
        if(fromProfile) {
            navigation.goBack(); //go to profile if came from profile otherwise homepage
        }else{
            navigation.navigate('Home');
        }
    }

    //save button
    const saveBtnHandler = () => {
        saveStory(story, blanks) //save story to db
        .then(res => {
            console.log(res);
            navigation.navigate('Home');
            Speech.stop();
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(errorCode, errorMessage);
        });
    }

    //play again button
    const playAgainHandler = () => {
        Speech.stop();
        if(!fromProfile) { //go to game page to play again
            navigation.goBack();
        }else{
            navigation.navigate('Game', story.title);
        }
    }

    //repeat speech button
    const repeatBtnHandler = () => {
        Speech.stop();
        Speech.speak(fillStory(story.story, blanks));
    }

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <TouchableOpacity onPress={backBtnHandler}>
                <Icon style={styles.backBtn} name="arrow-back" size={28}/>
            </TouchableOpacity>
            <ScrollView style={styles.detailsContainer}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{story?.title}</Text>
                </View>
                <View style={styles.body}>
                    <Text>{fillStory(story.story, blanks)}</Text>
                </View>
                <View style={styles.btnGroup}>
                    <TouchableOpacity style={styles.btn} onPress={repeatBtnHandler}>
                        <Text style={styles.btnText}>Play Audio</Text>
                    </TouchableOpacity>
                    {!fromProfile && 
                        <TouchableOpacity style={styles.btn} onPress={saveBtnHandler}>
                            <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.btn} onPress={playAgainHandler}>
                        <Text style={styles.btnText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
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
    backBtn: {
        marginTop: 25,
        marginStart: 15,
    },
    title: {
        flex: 0.10,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'black',
        fontSize: 24,
        fontWeight: '500',
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
    body: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    btnGroup: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 10,
    },
    btn: {
        marginTop: 10,
        width: 100,
        marginHorizontal: 5,
        height: 35,
        backgroundColor: '#5D3FD3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,

    },
    btnText: {
        color: 'white', 
        fontSize: 14, 
        fontWeight: 'bold',
    },
});
