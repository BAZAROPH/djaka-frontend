import { Text, TouchableOpacity } from 'react-native'
import { styles } from './InformationButtonStyle'
export default function InformationButton({title, onClick, style, width}) {
  return (
    <TouchableOpacity style={[styles.button, {width:width}]}  onPress={()=>onClick}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}