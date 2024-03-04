import { View, Text, Image, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox';


import { styles } from './HiddableIncrementableInputStyle'
import NormalInput from '../normalinputtext/NormalInput'
import { COLORS, icons } from '../../../../constants'

export default function HiddableIncrementableInput({style, hiddable=true, fields, setFields, placeholder, field}) {


    const onChange = (value, index)=>{
        setFields(field, fields.map((field, _)=>{
            if (index === _) return {...field, value: value};
            return field;
        }))
    }

    const checked = (index)=>{
        setFields(field,  fields.map((field, _)=>{
            if (index === _) return {...field, hidden: !field.hidden};
            return field;
        }))
    }

    const addField = ()=>{
        setFields(field, [...fields, {
            value: '',
            hidden: false,
        }])
    }

    const deleteFiled = (index)=>{
        setFields(field, fields.filter((value, _)=> index !== _));
    }

    return fields && fields.map((field, index)=>(
        <View style={[styles.box, {...style}, fields.length > 1 && { marginBottom: 1}]} key={index}>
            <View 
                style={[
                    styles.inputBox, 
                    hiddable === false ? { width: '90%'} : { width: '70%'} 
                ]}
            >
                <NormalInput placeholder={placeholder} value={field?.value} index={index} onChange={onChange}/>
            </View>
            <View style={[styles.iconBox]}>
                {
                    ( index === fields.length - 1 || index === 0 ) && (
                        <TouchableOpacity onPress={addField}>
                            <Image source={icons.greenPlus} style={styles.icon} />
                        </TouchableOpacity>
                    )
                }

                {
                    fields.length > 1 && (
                        <TouchableOpacity onPress={()=>deleteFiled(index)}>
                            <Image source={icons.whiteSub} style={styles.icon}/>
                        </TouchableOpacity>
                    )
                }


            </View>
            {
                hiddable && (
                    <View style={[styles.hiddeBox, { width: '20%'}]}>
                        <Checkbox 
                            style={styles.checkbox}
                            value={field.hidden}
                            onValueChange={()=>checked(index)}
                            color={field.hidden ? COLORS.secondary : undefined}
                        />
                        <Text style={styles.hiddeText}>Cacher</Text>
                    </View>
                )
            }
        </View>
    ))
}