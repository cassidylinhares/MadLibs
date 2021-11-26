import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground} from 'react-native';
const width = Dimensions.get("screen").width/2-30

const Home = ({navigation}) => {

    const themes = [{id:1, name: 'christmas',img: require("../assets/images/xmas.jpg"), about: "We're making it up as we go along. Here's a Christmas story for you!"}, {id:2, name:'meangirls',img: require("../assets/images/meangirls.jpg"), about: "Get in loser, we're playing madlibs. We're making it up as we go along. Here's a story from the all time classic for you!"}, {id:3, name:'fish', img: require("../assets/images/halloween.jpg"),about: "We're making it up as we go along. Here's a Christmas story for you!"}, {id:4, name:'fire', img: require("../assets/images/mystery.jpg"),about: "We're making it up as we go along. Here's a Christmas story for you!"}, {id:5, name:'flower', img: require("../assets/images/mystery.jpg"), about: "We're making it up as we go along. Here's a Christmas story for you!"}, {id:6, name:'sky', img: require("../assets/images/spiderman.jpg"),about: "We're making it up as we go along. Here's a Christmas story for you!"},];

    const categories=['ALL', 'MOVIES', 'HOLIDAYS', 'RANDOM'];

    const [categoryIndex, setCateoryIndex] = React.useState(0);

    const CategoryList = () => {
        return (
            <View style={styles.categoryContainer}>
                {categories.map((item, index) =>(
                <TouchableOpacity 
                key={index} 
                activeOpacity={0.8}
                onPress={()=>setCateoryIndex(index)}>
                    <Text style={[
                    styles.categoryText, categoryIndex == index && styles.categoryTextSelected,
                    ]}>
                    {item}
                    </Text>
                </TouchableOpacity>

                ))}
            </View>
        );
    };

   const Card = ({theme}) => {
        return (
        <TouchableOpacity onPress={() => navigation.navigate("Play", theme)}>
            <View style={styles.card}>
                 <Image style={{flex: 1,height: 225, width: 120, resizeMode: 'cover'}} source={theme.img} />

            </View> 
        </TouchableOpacity>

        );
    };

    return (
        <SafeAreaView style={{flex:1, paddingHorizontal:20, backgroundColor: "white",}}>
            <View style={styles.header}>
                
              <View>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>MAD LIBS</Text>
              </View>
              <Icon style={{marginTop: 7,}} name="bars" size={30} color="#CBC3E3"/>
            </View>
           
            <CategoryList/>
            <FlatList  
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator= {false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={themes}
                renderItem={({item}) => <Card theme={item}/>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    card: {
        height: 225,
        backgroundColor: '#CBC3E3',
        width,
        marginHorizontal: 2,
        borderRadius: 12,
        marginBottom: 20,
        padding: 15,

        
    },
    categoryContainer:{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    categoryText: {
        fontSize: 16,
        color: "grey",
        fontWeight: 'bold',
    },
    categoryTextSelected: {
        color: "#CBC3E3",
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: "#CBC3E3"
    }
})

export default Home;
