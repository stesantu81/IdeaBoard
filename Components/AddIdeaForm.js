import { useState } from "react";
import { View, Text,Pressable,StyleSheet } from "react-native";
import { colors } from "../theme";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";


export default function AddIdeaForm({ initialIdea, onSubmit}){
    const[title,setTitle]= useState(initialIdea?.title ?? '');
    const[description,setDescription]= useState(initialIdea?.description ??'');
    const[tag,setTag]= useState(initialIdea?.tag ?? '');
    const[errors,setErrors]= useState({title:'',tag:''});

    const isEditing = Boolean(initialIdea);
    

    const handleSubmit = () => {
        const newErrors = {
            title: title.trim() === ''? 'Aggiungi un Titolo' : '',
            tag: tag.trim() === '' ? 'Aggiungi un tag' : '',
        };
        setErrors(newErrors);

        if (newErrors.title || newErrors.tag){
            return;
        }
    
        onSubmit({title,description,tag});
        setTitle('');
        setDescription('');
        setTag('');
    };

    return(
        <View style={styles.form}>

        <BottomSheetTextInput 
        style = {styles.input}
            placeholder="Titolo"
            placeholderTextColor={colors.textMuted}
            value={title}
            onChangeText={setTitle}
            />
            {errors.title !== ''&&<Text style={styles.errorText}>{errors.title}</Text>}
            <BottomSheetTextInput 
            style ={[styles.input, styles.descriptionInput]}
            placeholder="Descrizione"
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            />
            <BottomSheetTextInput  
            style={styles.input}
            placeholder="Tag"
            placeholderTextColor={colors.textMuted}
            value={tag}
            onChangeText={setTag}
            />
            {errors.tag !== ''&&<Text style={styles.errorText}>{errors.tag}</Text>}

            <Pressable style ={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    {isEditing ? 'Salva modifiche' : 'Add Idea'}
                </Text>
            </Pressable>

        </View>
    );

}

const styles = StyleSheet.create({
    form:{
        marginBottom:20,
        gap:10,
    },
    input:{
        backgroundColor:colors.card,
        borderWidth:1,
        borderColor:colors.border,
        borderRadius:10,
        padding:12,
        fontSize:14,
        color:colors.text,
    },
    button:{
        backgroundColor:colors.accent,
        borderRadius:10,
        paddingVertical: 12,
        alignItems:'center',
    },
    buttonText:{
        color:colors.onAccent,
        fontSize:15,
        fontWeight:'600',
    },
    descriptionInput:{
        minHeight:50,
        maxHeight:160,
    },
    errorText:{
        color: colors.danger,
        fontSize: 12,
    },
});
