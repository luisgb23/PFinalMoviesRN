import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native'

import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';
import { usePostOrderMutation } from '../services/shopServices';
import {colors} from "../global/colors";


const Cart = () => {

  const {items: CartData, total} = useSelector((state) => state.cart.value)

  const [triggerPostOrder, result] = usePostOrderMutation()

  const onConfirmOrder = () => {
    triggerPostOrder({items: CartData, user: "mail@mail.com", total})
    Alert.alert("Orden confirmada satisfactoriamente")
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
        keyExtractor={(producto) => producto.id}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalPrice}>Total: $ {total}</Text>
      </View>
      <View style={styles.confirmContainer}>
        <Pressable style={styles.buttonConfirm} onPress={onConfirmOrder}>
          <Text style={styles.textConfirm}>Confirmar Orden</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Cart

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 100,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 20
  },
  confirmContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfirm: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginTop: 15,
    color: 'white'
  },
  textConfirm:{
    fontSize:18,
    fontFamily: "Poppins"
  }
});
