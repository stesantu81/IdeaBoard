import { View, Text,StyleSheet, Pressable,Alert} from "react-native";
import { colors, getTagColors } from "../theme";
import{ Ionicons} from '@expo/vector-icons';


export default function IdeaCard({title, description, tag,completed,onToggleComplete,onDelete,onEdit,date}){
function confirmDelete(){
  Alert.alert(
    'Eliminare questa Idea?',
    'Non potrai recuperarla',
    [
      {text: 'Annulla', style: 'cancel'},
      {text : 'Elimina',style: 'destructive',onPress: onDelete},
    ] 
  );
}
const tagColors = getTagColors(tag);
/*inserimento della data*/
const dateLabel = new Date(date).toLocaleDateString('it-IT',{
  day: 'numeric',
  month:'short',
  year : 'numeric',
});
    return(
        <View style={styles.card}>

          {/* checkbox a complete*/}
          
          <Pressable
          style={[styles.checkbox, completed && styles.checkboxDone]}
          onPress={onToggleComplete}>
            {completed && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>

          {/*contenuto al centro*/}

          <Pressable 
          style={[styles.content, completed && styles.contentCompleted]}
          onPress={onEdit}
          >
        <Text style={[styles.title, completed && styles.textCompleted]}>{title}</Text>
        <Text style={[styles.description, completed && styles.textCompleted]}>{description}</Text>

        {/*visualizzazione colori delle pills */}
      <View style ={styles.footer}>
        <View style={[styles.tagPill,{backgroundColor: tagColors.bg}]}>
          <Text style={[styles.tagText,{color: tagColors.text}]}>{tag}</Text>
        </View>
        <Text style={styles.dateText}>{dateLabel}</Text>
        </View>
          </Pressable>

      {/*thrash icon*/}

      <Pressable style={styles.deleteButton} onPress={confirmDelete} hitSlop={8}>
        <Ionicons name="trash-outline" size={20} color={colors.textMuted}/>
      </Pressable>

    </View>
  );
}

const styles= StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxDone: {
    backgroundColor: colors.completedBg,
    borderColor: colors.completedBg,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentCompleted: {
    opacity: 0.5,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 8,
    lineHeight: 18,
  },
  tagPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 11,
    color: colors.text,
  },
  deleteButton:{
    padding:4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: colors.textMuted,
  }
});