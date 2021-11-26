import React from 'react'
import {View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image} from 'react-native';
import themes from '../consts/themes';
const width = Dimensions.get("screen").width/2-30

const Home = () => {
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
            <View style={styles.card}>
                <View style={{alignItems: 'flex-end'}}> 
                    <View style={{height: 100, alignItems: 'center'}}>
                        <Image style={{flex: 1, resizeMode: 'contain'}} source={theme.img} />
                    </View>
                </View>
            </View> 

        );
    };

    return (
        <SafeAreaView style={{flex:1, paddingHorizontal:20, backgroundColor: "white",}}>
            <View style={styles.header}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>MAD LIBS</Text>
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
