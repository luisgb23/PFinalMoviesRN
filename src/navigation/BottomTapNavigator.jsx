import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'
import MyProfileStackNavigator from "./MyProfileStackNavigator";

import Header from '../components/Header'
import { colors } from '../global/colors'

import { FontAwesome5 } from "@expo/vector-icons";


const Tab = createBottomTabNavigator()

const BottomTapNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Tienda"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="store"
                  size={24}
                  color={focused ? "black" : colors.lightGray}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mi carrito"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="shopping-cart"
                  size={24}
                  color={focused ? "black" : colors.lightGray}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Ordenes"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="receipt"
                  size={24}
                  color={focused ? "black" : colors.lightGray}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mi perfil"
        component={MyProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="user-alt"
                  size={24}
                  color={focused ? "black" : colors.lightGray}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTapNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#4B70F5',
    height: 60
  }
})
