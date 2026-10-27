import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import { useEffect, useState,useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView,BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import{ Ionicons} from '@expo/vector-icons';
import * as SystemUI from 'expo-system-ui';
SystemUI.setBackgroundColorAsync(colors.background);


import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Components/Header';
import FilterBar from './Components/FilterBar';
import IdeaList from './Components/IdeaList';
import AddIdeaForm from './Components/AddIdeaForm';
import {colors}  from './theme';


export default function App() {
  const[ideas,setIdeas] = useState([]);
  const[selectedTag, setSelectedTag] = useState('Tutte');
  const addSheetRef = useRef(null);
  const[editingIdea,setEditingIdea] = useState(null)
  const[formVersion,setFormVersion]= useState(0);

  // inizio useEffecct per salvare le idee

  useEffect(()=> {
    async function loadIdeas() {
      const saved = await AsyncStorage.getItem('ideas');
      if(saved){
        setIdeas(JSON.parse(saved));
      }
      
    }
    loadIdeas();
  },[]);
  
  useEffect(()=>{
    AsyncStorage.setItem('ideas',JSON.stringify(ideas));
  },[ideas]);

  function openAddSheet(){
    setEditingIdea(null);
    addSheetRef.current?.present();
  }

  function openEditSheet(idea){
    setEditingIdea(idea);
    addSheetRef.current?.present();
  }
  
  function handleSaveIdea(values) {
    if (editingIdea) {
      setIdeas(
        ideas.map((idea) =>
          idea.id === editingIdea.id ? { ...idea, ...values } : idea
        )
      );
    } else {
      setIdeas([
        ...ideas,
        { id: Date.now(), ...values, completed: false },
      ]);
    }
    addSheetRef.current?.dismiss();
  }

  /*function handleAddIdea(newIdea) {
    setIdeas([
      ...ideas,
      {id:Date.now(), ...newIdea, completed:false  },
    ]);
    addSheetRef.current?.dismiss();
    
  }*/
  function handleToggleComplete(id) {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, completed: !idea.completed } : idea
      )
    );
  }
  function handleDeleteIdea(id){
    setIdeas(ideas.filter((idea)=>idea.id !== id));
  }

  const uniqueTags = [...new Set(ideas.map((idea)=> idea.tag))];
  const filteredIdeas = selectedTag === 'Tutte'
  ? ideas
  : ideas.filter((idea) => idea.tag === selectedTag);

  return (
  <GestureHandlerRootView style={{flex:1}}>
    <BottomSheetModalProvider>
    <View style={styles.container}>
      <Header/>
      
      <FilterBar 
      tags={uniqueTags}
      selectedTag ={selectedTag}
      onSelectTag ={setSelectedTag}
      />
      <IdeaList ideas= {filteredIdeas}
      onToggleComplete={handleToggleComplete}
      onDelete ={handleDeleteIdea}
      onEdit={openEditSheet}
      />
      <Pressable style={styles.fab} onPress={openAddSheet}>
        <Ionicons name="add" size={28} color={colors.onAccent} />
        <Text style={styles.fabText}>Nuova idea</Text>
      </Pressable>
      <StatusBar style="light"/>
      <BottomSheetModal
        ref={addSheetRef}
        snapPoints={['60%', '90%']}
        enableDynamicSizing={false}
        enablePanDownToClose
        onDismiss={() => {
          setEditingIdea(null);
          setFormVersion((v) => v +1);
        }}
        backgroundStyle={{backgroundColor:colors.card}}
        handleIndicatorStyle={{backgroundColor:colors.textMuted}}
        keyboardBehavior="extend"
        keyboardBlurBehavior='restore'
        android_keyboardInputMode="adjustResize"
        >

        <BottomSheetView style={{padding:20}}>
          <AddIdeaForm 
          key={`${editingIdea ? editingIdea.id : 'new'}-${formVersion}`}
          initialIdea={editingIdea}
          onSubmit={handleSaveIdea}
          />
        </BottomSheetView>
      </BottomSheetModal>
      </View>
      </BottomSheetModalProvider>
      </GestureHandlerRootView>
  );

  
}

//stile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal:16,
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  fabText: {
    color: colors.onAccent,
    fontSize: 15,
    fontWeight: '600',
  },
});
