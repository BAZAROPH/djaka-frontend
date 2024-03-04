import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../../constants'

export default function ScreenGradient({ style, children }) {
  return (
    <LinearGradient
        colors={COLORS.sreenBlueGradient}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={style}
    >
        {children}
    </LinearGradient>
  )
}
