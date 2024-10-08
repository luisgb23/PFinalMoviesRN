import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../global/colors";

import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";

import { insertSession } from "../persistence";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch()

  const [triggerSignIn, result] = useSignInMutation() 


  useEffect(()=> {
    if (result?.data && result.isSuccess) {
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken
      }).then((response)=> {
        console.log(response)
        dispatch(
          setUser({
            email: result.data.email,
            idToken: result.data.idToken,
            localId: result.data.localId,
          })
        );        
      }).catch(err => {
        Alert.alert(err)
      })
    }
  }, [result])

  const onSubmit = ()=> {
    triggerSignIn({email, password, returnSecureToken: true})
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>CoderShop</Text>
        <InputForm label={"Email"} onChange={setEmail} error={""} />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={""}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Iniciar sesión" />

        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Crear cuenta</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins",
  },
  sub: {
    fontSize: 14,
    color: "black",
    fontFamily:"Poppins"
  },
  subLink: {
    fontSize: 14,
    color: "blue",
    fontFamily:"Poppins"
  },
});
