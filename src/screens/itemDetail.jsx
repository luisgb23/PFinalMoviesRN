import React, { useEffect, useState } from "react";

import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";


import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";
import AddButton from "../components/AddButton";


const ItemDetail = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState("portrait");
  const { productoId: idSelected } = route.params;

  const dispatch = useDispatch()

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected);

  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

const handleAddCart = () => {
  dispatch(addCartItem)
  dispatch(addCartItem({...product, quantity: 1}))
}

  return (
    <View>
      <Button onPress={() => navigation.goBack()} title="Back" />
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: product.images[0] }}
            style={
              orientation === "portrait" ? styles.image : styles.imageLandscape
            }
            resizeMode="cover"
          />
          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text style={styles.textItems}>{product.title}</Text>
            <Text style={styles.textItems}>{product.description}</Text>
            <Text style={styles.price}> ${product.price}</Text>
            <View style={styles.button} >
              <AddButton title="Add to cart" onPress={handleAddCart} />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom:10
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },

  textContainer: {
    flexDirection: "column",
  },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  price: {
    textAlign: "left",
    fontFamily: "Poppins",
    fontSize:16,
    marginTop:5
  },
  textItems:{
    fontFamily: "Poppins",
    fontSize:14
  },
  button:{
    justifyContent:'center',
    alignItems:'center'
  }
});
