import{View, Text,StyleSheet} from 'react-native';
import { colors } from '../theme';

export default function Header(){
    return(
        <View style = {styles.header}>
        <Text style = {styles.title}>Le Mie Idee</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        
    },
    title:{
        fontSize:22,
        fontWeight: '600',
        color: colors.text,
    },
    
});