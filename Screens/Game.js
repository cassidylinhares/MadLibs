import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getStory } from '../firebase';

const Game = ({navigation, route}) => {
    //get parameters passed from the play screen
    const theme = route.params;

    const [story, setStory] = useState({});
    const [blanks, setBlank] = useState([]);
    let blankCounter = 0;
    
    //on initializing the component
    useEffect(() => {
        async function fetchStory() {
            const storyFetched = await getStory(theme);
            if(storyFetched === "error") {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(errorCode, errorMessage);
            } else {
                setStory({...storyFetched});
                setBlank([...storyFetched.blanks]);
            }
        } 
        fetchStory();    
    }, []);

    //makes the ui for the blank word types
    const mapBlanks = () => {
        //handler when user changes the text
        const handleBlankInput = (text, i) => {
            let blanksTemp = blanks; //copy blanks
            blanksTemp[i] = text; //alter the copy
            setBlank(blanksTemp); //change it to the altered copy
            blankCounter++;
        }
        //the ui
        return story?.blanks?.map((blank, index) => (
            <View style={styles.inputContainer} key={index}>
                <TextInput style={styles.input} onChangeText={text => handleBlankInput(text, index)}/>
                <Text>{blank}</Text>
            </View>
        ));
    }

    const readStoryBtnHandler = () => {
        // if(counter == blanks.length) {
            navigation.navigate("Result", {story: story, blanks: blanks, fromSaved: false});
        // }
    }

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Icon style={{marginTop: 50, marginStart: 15}} name="arrow-back" size={28}/>
            </TouchableOpacity>
            <ScrollView style={styles.detailsContainer}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{story?.title}</Text>
                </View>
                <View style={styles.inputOutterContainer}>
                    {story !== null && mapBlanks()}
                </View>
                <TouchableOpacity style={styles.btn} onPress={readStoryBtnHandler}>
                    <Text style={styles.btnText}>Read Story</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    backgroundContainer: {
        flex: 1, 
        backgroundColor: "#CBC3E3"
    },
    detailsContainer: {
        flex: 1,
        height: 100,
        backgroundColor: "#F8F8F8",
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 20,
        paddingTop: 20
    },
    inputOutterContainer: {
        marginTop: 20,
    },
    inputContainer: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'baseline',
        marginTop: 10,
    },
    input:{
        width: 175,
        borderColor: '#5D3FD3',
        borderWidth: 1,
        borderRadius: 7,
        marginHorizontal:30
    },
    btn: {
        alignSelf:'center',
        marginVertical: 50,
        width: 290,
        marginHorizontal: 35,
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

export default Game;