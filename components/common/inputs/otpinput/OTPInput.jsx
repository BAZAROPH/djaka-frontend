import React, { useRef, useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";
import { styles } from "./OTPInputStyle";
import { COLORS } from "../../../../constants";

export default function OTPInput({ width, value, style, length = 5, onChange, editable = true, error = null, onBlur }) {
    const inputRefs = useRef(
        Array(length).fill(null).map(() => React.createRef())
    );

    const [texts, setTexts] = useState(value ? value.split('') : Array(length).fill(''))

    useEffect(() => {
        inputRefs.current = inputRefs.current.map((ref) => ref.current);
    }, []);

    const handleChangeOTP = (text, index) => {
        let middle = texts;
        middle[index] = text;

        setTexts(middle)

        onChange(parseInt(middle.join('')))

        if (text !== '' && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    // const handleKeyPress = (index) => ({ nativeEvent }) => {
    //     if (nativeEvent.key === "Backspace" && index > 0 && inputRefs.current[index - 1]) {
    //         inputRefs.current[index - 1].focus();
    //     }
    // };

    return (
        <>
            <View
                style={[
                        {
                            width: "100%",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 15,
                            paddingHorizontal: 5,
                        }, 
                        width && { width: width }, { ...style }
                ]}
            >
                {Array(length).fill(0).map((_, index) => (
                        <TextInput
                            ref={inputRefs.current[index]}
                            key={index}
                            style={[styles.OTPInput(length), error && { borderColor: COLORS.error }]}
                            selectionColor="white"
                            keyboardType={"numeric"}
                            onChangeText={(text) => handleChangeOTP(text, index)}
                            editable={editable}
                            // onKeyPress={handleKeyPress(index)}
                            onBlur={onBlur}
                            maxLength={1}
                        />
                    ))}
            </View>
            {
                error && <Text style={styles.error}>{error}</Text>
            }
        </>
    );
}
