import { StyleSheet, View, SafeAreaView, StatusBar, Platform, Text, Alert } from "react-native";
import { useFonts } from "expo-font";
import { colors } from "./src/global/colors";

import Navigator from "./src/navigation/Navigator";

import { Provider } from "react-redux";
import store from "./src/store";

import { initSQLiteDB } from "./src/persistence"; 

(async ()=> {
  try {
    const response = await initSQLiteDB()
  } catch (error) {
    Alert.alert({errorCreatingDB: error})
  }
})()


export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    Poppins: require("./assets/Poppins-Regular.ttf")
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});
