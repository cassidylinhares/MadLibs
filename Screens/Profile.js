import { useNavigation } from '@react-navigation/core'
import React, {Component} from 'react'
import { StyleSheet,ScrollView, Text, View, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../firebase'

class Profile extends Component {
    render() {
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
        <View>
            <ScrollView>
                <View  style={{padding:10, width:'100%', backgroundColor: "#CBC3E3", height:210}} >
                <Icon style={{marginTop: 30}}name="arrow-back" size={28} onPress={() => {this.props.navigation.goBack()}}/>
                </View>
                <View style={{alignContent:'centre', justifyContent:"center"}}>
                <Image source={require('../assets/images/madlibslogo.jpg')} style={{width:140,height:140,borderRadius:100,marginTop:-70}}></Image>
                <Text style={{fontSize:35, fontWeight:'bold',padding:10}}>PROFILE</Text>
                <Text style={{fontSize:20, fontWeight:'bold',color:'grey'}}>{auth.currentUser?.email}</Text>
                </View>
                
            </ScrollView>
           
    
            <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={handleSignout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        
        </View>
    );  
  }
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
