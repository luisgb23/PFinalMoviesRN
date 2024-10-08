import { StyleSheet, Text, View, FlatList } from "react-native";

import OrderItem from "../components/OrderItem";
import { useGetOrdersByUserQuery } from "../services/shopServices";


const Order = () => {
  const { data: OrderData, isLoading } = useGetOrdersByUserQuery("mail@mail.com");
  
  return (
    <View>
      <FlatList
        data={OrderData}
        keyExtractor={(orderItem) => orderItem}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});
