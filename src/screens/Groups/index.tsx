
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';

import { Container } from './styles';
import { Alert, FlatList } from 'react-native';
import { useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';

export function Groups() {
  const [ groups, setGroups ] = useState<string[]>([])

  return (
    <Container>
      <Header />
      <HighLight 
        title='Turmas'
        subTitle='Jogue com a sua turma'
      />
      
      
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={item => (
          <GroupCard 
            title={item.item} 
            onPress={() => Alert.alert("Open Card")}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Que tal cadastrar a primeira turma? '
          />
        )}
      />

      
    </Container>
  );
}

