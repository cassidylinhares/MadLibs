import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { getStory } from '../firebase';

const Game = ({navigation, route}) => {
    //get parameters passed from the play screen
    const theme = route.params;

    const [story, setStory] = useState({});
    const [blanks, setBlank] = useState([]);
    
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
        }
        //the ui
        return story?.blanks?.map((blank, index) => (
            <View style={styles.title} key={index}>
                <TextInput onChangeText={text => handleBlankInput(text, index)}/>
                <Text>{blank}</Text>
            </View>
        ));
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#CBC3E3"}}>
        <View style={styles.detailsContainer}>
            <View style={styles.title}>
                <Text style={{color: 'grey', fontSize:16, lineHeight: 22, marginTop: 8}}>{story?.title}</Text>
            </View>
            {story !== null && mapBlanks()}
            <View style={styles.btn} >
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Read Story</Text>
            </View>
        </View>
        
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

    }
});

export default Game;