import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { colors } from "../global/colors";
import { useGetCategoriesQuery } from "../services/shopServices";


const Home = ({ navigation, route }) => {
  const {data: categories} = useGetCategoriesQuery()
  return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Coder Shop</Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(category) => category}
              data={categories}
              renderItem={({ item }) => (
                  <CategoryItem category={item} navigation={navigation} />
              )}
          />
        </View>
      </>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.green300,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  titleContainer: {
    backgroundColor: colors.green300,
  },
  title:{
    fontSize: 40,
    fontWeight:'bold',
    color: '#131842',
    marginTop:30,
    marginBottom: 30,
    marginLeft:20
  }
});
