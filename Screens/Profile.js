import React, { useEffect, useState } from 'react';
import { auth, getSavedStories } from '../firebase';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

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
        <SafeAreaView style={styles.container}>
            <View>
                <Text>{auth.currentUser?.email}</Text>
            </View>
            <View>
                {console.log(savedStories)}
            </View>
            <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={handleSignout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

//allow this component to be used elsewhere in the code
export default Profile;

//style (css) to the ui
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonContainer: {
        width: '50%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius:7,
        alignItems:'center',
    },
    buttonText: {
        color: 'white',
        fontWeight:'600',
        fontSize: 16,
    },
})
