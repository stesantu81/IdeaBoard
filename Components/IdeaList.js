import{ ScrollView} from 'react-native';

import IdeaCard from './IdeaCard';

export default function IdeaList({ideas,onToggleComplete,onDelete,onEdit}) {
   return(
        <ScrollView contentContainerStyle={{paddingBottom:100}}>
          {ideas.map((idea) => (
        <IdeaCard
         key={idea.id}
          title= {idea.title}
          description={idea.description}
          tag={idea.tag}
          completed={idea.completed}
          date={idea.id}
          onToggleComplete={() => onToggleComplete(idea.id)}
          onDelete={()=> onDelete(idea.id)}
          onEdit={()=> onEdit(idea)}
          />
        
      ))}
    
        </ScrollView>
    );
}