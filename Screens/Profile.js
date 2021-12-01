import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet,ScrollView, Text, View, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, getSavedStories  } from '../firebase'

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
        <SafeAreaView>
            <View  style={{padding:10, width:'100%', backgroundColor: "#CBC3E3", height:200}} >
                <Icon style={{marginTop: 30}}name="arrow-back" size={28} onPress={()=>navigation.goBack()}/>
            </View>
            <View style={{alignContent:'center'}}>
                <Image source={require('../assets/images/madlibslogo.jpg')} style={{marginLeft: 30, width:140,height:140,borderRadius:100,marginTop:-70}}/>
            </View>
            <View>
                <Text style={{fontSize:35, fontWeight:'bold', marginLeft: 20}}>PROFILE</Text>
                <Text style={{fontSize:20, fontWeight:'bold',color:'grey', marginLeft:20, color: '#5D3FD3'}}>{auth.currentUser?.email}</Text>
            </View>
            <View style={{
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
                }}>
                    <Text style={{fontWeight:'bold', textAlign:'center',fontSize:30}}>Saved Stories</Text>

                </View>
                <View>
                    {console.log(savedStories)}
                </View>
                <View style={{
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
                    marginTop:20
                }}>
                    <Text style={{fontWeight:'bold', textAlign:'center',fontSize:30}}>How to Play?</Text>

                </View>
                <View style={{
                    alignSelf:'center',
                    flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:"#CBC3E3",
                    width:'100%',
                    padding:20,
                    paddingBottom:22,
                    borderRadius:10,
                    shadowOpacity:80,
                    elevation:15,
                    marginTop:20
                }}>
                    <TouchableOpacity onPress={handleSignout}>
                    <Text style={{fontWeight:'bold', textAlign:'center',fontSize:30}}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

        </SafeAreaView>
    );  
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
