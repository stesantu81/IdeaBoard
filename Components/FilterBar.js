import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { colors,getTagColors } from '../theme';

export default function FilterBar({ tags, selectedTag, onSelectTag }) {
  const allTags = ['Tutte', ...tags];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {allTags.map((tag) => {
        const isSelected = tag === selectedTag;
        const tagColors = tag === 'Tutte'? null: getTagColors(tag); 
        return (
          <Pressable
          key={tag}
          style={[
          styles.pill,
           isSelected && styles.pillSelected,
           tagColors && { borderColor: tagColors.text },
            tagColors && isSelected && { backgroundColor: tagColors.bg },
            ]}
          onPress={() => onSelectTag(tag)}
          >
  <Text
    style={[
      styles.pillText,
      isSelected && styles.pillTextSelected,
      tagColors && { color: tagColors.text },
    ]}
  >
    {tag}
  </Text>
</Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexGrow: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
  },
  pill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  pillSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  pillText: {
    color: colors.text,
    fontSize: 13,
  },
  pillTextSelected: {
    color: colors.onAccent,
    fontWeight: '600',
  },
});