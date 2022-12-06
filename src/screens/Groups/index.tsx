
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';

import { Container } from './styles';
import { Alert, FlatList } from 'react-native';
import { useState } from 'react';

export function Groups() {
  const [ groups, setGroups ] = useState<string[]>(['Galera da Rocket', 'Aposendados'])

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
      />

      
    </Container>
  );
}

