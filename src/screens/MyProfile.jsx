import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native'
import { colors } from '../global/colors'
import AddButton from '../components/AddButton'

import { useDispatch, useSelector } from "react-redux";
import { useGetProfileimageQuery } from '../services/shopServices'
import { clearUser } from '../features/User/UserSlice';
import { truncateSessionTable } from '../persistence';



const MyProfile = ({navigation}) => {

      const dispatch = useDispatch()
      const {imageCamera, localId} = useSelector((state) => state.auth.value)
      const {data: imageFromBase} = useGetProfileimageQuery(localId)
      const launchCamera = async () => {
        navigation.navigate("Image Selector");
      };

      const launchLocation = async () => {
        navigation.navigate("List Address");
      };

      const defaultImageRoute = "../../assets/user.png";

      const signOut = async () => {
        try {
          const response = await truncateSessionTable()
          console.log(response)
          dispatch(clearUser())
        } catch (error) {
          Alert.alert({errorSignOutDB: error})
        }
      }

  return (
    <View style={styles.container}>
      {imageFromBase || imageCamera ? (
        <Image
          source={{ uri: imageFromBase?.image || imageCamera }}
          style={styles.img}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.img}
          resizeMode="cover"
          source={require(defaultImageRoute)}
        />
      )}
      <AddButton
        onPress={launchCamera}
        title={
          imageFromBase || imageCamera
            ? "Modificar imagen de perfil"
            : "Agregar imagen de perfil"
        }
      />
      <AddButton title="Mi dirección" onPress={launchLocation} />
      <AddButton onPress={signOut} title="Cerrar sesión" />
    </View>
  );
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginTop: 10
  },
  btn: {
    marginTop: 10,
    backgroundColor: colors.white,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 5
  }
})
