import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
            const storyFetched = await getStory(theme.id);
            setStory({...storyFetched});
            setBlank([...storyFetched.blanks]);
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
            <View style={styles.title} key={index}>
                <TextInput onChangeText={text => handleBlankInput(text, index)}/>
                <Text>{blank}</Text>
            </View>
        ));
    }

    const readStoryBtnHandler = () => {
        // if(counter == blanks.length) {
            navigation.navigate("Result", {story: story, blanks: blanks});
        // }
    }

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView style={styles.detailsContainer}>
                <View style={styles.title}>
                    <Text style={styles.btnText}>{story?.title}</Text>
                </View>
                {story !== null && mapBlanks()}
                <TouchableOpacity style={styles.btn} onPress={readStoryBtnHandler}>
                    <Text style={styles.btnText}>Read Story</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    backgroundContainer: {
        flex: 1, 
        backgroundColor: "#CBC3E3"
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

export default Game;