import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../global/colors";
import SubmitButton from "../components/SubmitButton";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { signupSchema } from "../validations/singUpScheme";



const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch()
  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      )
    }
  }, [result])

  const onSubmit = () => {
    try {

      setErrorMail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      signupSchema.validateSync({ email, password, confirmPassword })
      triggerSignUp({ email, password, returnSecureToken: true })
    
    } catch (err) {
      Alert.alert("Error on Signup", err);
      //console.log("Entro al signup del error");
      console.log(err.path);
      console.log(err.message);
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
        case "password":
          setErrorPassword(err.message);
        case "confirmPassword":
          setErrorConfirmPassword(err.message);
        default:
          break;
      }

    }
  }

  //console.log(result)

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>
        <InputForm
          label={"Email"}
          onChange={setEmail}
          error={errorMail}
        />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"Confirmar contraseña"}
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Ingresar" />
        <Text style={styles.sub}>Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Ir a Iniciar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

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
    backgroundColor: colors.gray100,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins",
  },
  sub: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "blue",
  },
});
