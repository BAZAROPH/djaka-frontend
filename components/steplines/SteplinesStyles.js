import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',    
        gap: 10
    },
    step: (length, step, activeStep) => (
        {
            width: `${100/length}%`,
            backgroundColor: step === activeStep ? '#7BEFFF' : 'rgba(123, 239, 255, 0.30)',
            padding: 4,
            borderRadius: 3
        }
    ),
})