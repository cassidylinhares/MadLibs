import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet,ScrollView, Text, View, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, getSavedStories } from '../firebase'
import { fillStory } from '../consts/common';

const Profile = ({navigation}) => {
    const [savedStories, setSavedStories] = useState([]);

    //do this when component loads
    useEffect(() => {
        async function fetchSavedStory() {
            const storiesFetched = await getSavedStories();
            setSavedStories([...storiesFetched]);
        } 
        fetchSavedStory(); 
    }, []);

    const mapSavedStories = () => {
        const savedStoryHandler = (e, story) => {
            navigation.navigate('Result', {story: story, blanks: story?.filled, fromSaved: true});
        }
        return savedStories?.map((story,i) => (
            <TouchableOpacity key={i} onPress={(e)=>savedStoryHandler(e, story)}>
                <Text>{story?.title}</Text>
            </TouchableOpacity>
        ));
    }

    //do this when sign out button is pressed
    const handleSignout = () => {
        auth.signOut()
        .then(() => {
            navigation.popToTop('Login');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(errorCode, errorMessage);
        });
    }

    //the ui design
    return (
        <SafeAreaView>
            <View style={styles.backButtonContainer} >
                <Icon style={styles.backButton}name="arrow-back" size={28} onPress={()=>navigation.goBack()}/>
            </View>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/images/madlibslogo.jpg')} style={styles.img}/>
            </View>
            <View>
                <Text style={styles.titleText}>PROFILE</Text>
                <Text style={styles.subtitleText}>{auth.currentUser?.email}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Saved Stories</Text>
                {mapSavedStories()}
            </View>
            
            <View style={styles.container}>
                <Text style={styles.text}>How to Play?</Text>
            </View>
            <View style={[styles.container, {backgroundColor:"#CBC3E3"}] }>
                <TouchableOpacity onPress={handleSignout}>
                    <Text style={styles.text}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );  
  }


//allow this component to be used elsewhere in the code
export default Profile;

//style (css) to the ui
const styles = StyleSheet.create({
    backbuttonContainer: {
        padding:10, 
        width:'100%', 
        backgroundColor: "#CBC3E3", 
        height:200
    },
    backButton: {
        marginTop: 30
    },
    imgContainer: {
        alignContent:'center',
    },
    img: {
        marginLeft: 30, 
        width:140,
        height:140,
        borderRadius:100,
        marginTop:-70,
    },
    titleText: {
        fontSize:35, 
        fontWeight:'bold', 
        marginLeft: 30
    },
    subtitleText: {
        fontSize:20, 
        fontWeight:'bold',
        color:'grey', 
        marginLeft:30, 
        color: '#5D3FD3'
    },
    container: {
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:"white",
        width:'100%',
        padding:20,
        paddingBottom:22,
        borderRadius:10,
        shadowOpacity:80,
        elevation:15,
        marginTop:50
    },
    text: {
        fontWeight:'bold', 
        textAlign:'center',
        fontSize:30
    },
})
