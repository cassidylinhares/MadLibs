import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground} from 'react-native';
const width = Dimensions.get("screen").width/2-30;

const Home = ({navigation}) => {
    //array for the cards with respective images and about info (tease)
    const themes = [
        {id:"A Crazy Thanksgiving", name:'Thanksgiving', img: require("../assets/images/xmas.jpg"), category: 'holidays', about: "It's looking a lot like Christmas. We're making it up as we go along, here's a Christmas story for you!"}, 
        {id:"The Plastics", name:'meangirls', img: require("../assets/images/meangirls.jpg"), category: 'movies', about: "Get in loser, we're playing madlibs. We're making it up as we go along, here's a story from the all time classic for you!"},
        {id:"Halloween", name:'halloween', img: require("../assets/images/halloween.jpg"), category: 'holidays', about: "OoooH, spooooky. We're making it up as we go along, here's a Halloween story for you!"}, 
        {id:"Plot Twist", name:'mystery1', img: require("../assets/images/mystery.jpg"), category: 'random', about: "Hmm, secretive. You gotta play to find out cause we're making it up as we go along. Here's a mystery story for you!"}, 
        {id:"Plot Twist", name:'mystery2', img: require("../assets/images/mystery.jpg"), category: 'random', about: "Hmm, secretive. You gotta play to find out cause we're making it up as we go along. Here's a mystery story for you!"}, 
        {id:"Clash with the Cops", name:'spiderman', img: require("../assets/images/spiderman.jpg"), category: 'movies', about: "We're making it up as we go along. Here's a Christmas story for you!"},];

    const categories=['ALL', 'MOVIES', 'HOLIDAYS', 'RANDOM']; //array holding the category titles

    //states for the category changing and filtering stories
    const [categoryIndex, setCateoryIndex] = useState(0);
    const [filteredThemes, setFilteredThemes] = useState([...themes]);

    //updates the page whenever the category changes
    useEffect(() => {
        const category = categories[categoryIndex].toLowerCase();
        setFilteredThemes([...themes]);
        
        if(category !== 'all') {
            let filtered = themes.filter((story)=> story.category === category);
            setFilteredThemes(filtered);
        } 
    }, [categoryIndex])
   

    //function to display the categories and colour change to the title when a category is selected
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

    //Card function to return image with respect to the array 'themes'
   const Card = ({theme}) => {
        return (
        <TouchableOpacity onPress={() => navigation.navigate("Play", theme)}>
            <View style={styles.card}>
                 <Image style={{flex: 1, height: 225, width: 120, resizeMode: 'cover', alignSelf:'center'}} source={theme.img} />
            </View> 
        </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{flex:1, backgroundColor: "white",}}>
            <View style={styles.header}> 
              <View>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>MAD LIBS</Text>
              </View>
              <TouchableOpacity>
                <Icon style={{marginTop: 7,}} name="bars" size={30} color="#5D3FD3" onPress={() => navigation.navigate("Profile")}/>
              </TouchableOpacity>
            </View>
           
           {/*Calling the CategoryList function as a tag */}
            <CategoryList/> 
            
             {/*Flatlist is a 'table' like tag, to make the layout of card display in 2 columns */}
             {/*Rendering the item to the function 'Card' */}
            <FlatList 
                columnWrapperStyle={{justifyContent: 'space-evenly'}}
                showsVerticalScrollIndicator= {false}
                contentContainerStyle={{
                    height:Dimensions.get("screen").height,
                    paddingTop:10,
                    paddingHorizontal:5, 
                    backgroundColor: "#5D3FD3"
                }}
                numColumns={2}
                data={filteredThemes}
                renderItem={({item}) => <Card theme={item}/>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal:20, 
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
        paddingHorizontal:20, 
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    categoryText: {
        fontSize: 16,
        color: "grey",
        fontWeight: 'bold',
    },
    categoryTextSelected: {
        color: "#5D3FD3",
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: "#CBC3E3"
    }
})

export default Home;
