import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import COLORS from "../consts/colors"
import { auth } from '../firebase'

const Profile = () => {
    const navigation = useNavigation();
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

    return (
        <SafeAreaView style={styles.container}>
            <Text>{auth.currentUser?.email}</Text>
            <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={handleSignout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
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
