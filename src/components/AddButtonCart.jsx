import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../global/colors";

const AddButton = ({
    title = "",
    onPress = () => {},
    color = colors.white,
}) => {
    return (
        <Pressable
            style={{ ...styles.button, backgroundColor: color }}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    button: {
        width: "45%",
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        marginTop: 15
    },
    text: {
        fontFamily: "Poppins",
        fontSize: 18,
        color: 'black',
    },
});
