import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export function Groups() {
  const [ groups, setGroups ] = useState<string[]>([])

  const { navigate } = useNavigation()
  
  function handleNewGroup(){
    navigate('new')
  }

  async function fetchGroups(){
    try {
      const data = await groupsGetAll()
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(useCallback( () => {
    fetchGroups()
  }, []))
  
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

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  ); 
}

