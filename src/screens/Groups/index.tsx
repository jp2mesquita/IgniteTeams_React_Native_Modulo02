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
import { Loading } from '@components/Loading';

export function Groups() {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ groups, setGroups ] = useState<string[]>([])

  const { navigate } = useNavigation()
  
  function handleNewGroup(){
    navigate('new')
  }

  async function fetchGroups(){
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string){
    navigate('players', { group } )
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
      
      
      {
        isLoading 
        ? <Loading />
        : <FlatList 
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item } )=> (
              <GroupCard 
                title={item} 
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1}}
            ListEmptyComponent={() => (
              <ListEmpty 
                message='Que tal cadastrar a primeira turma? '
              />
            )}
          />
      }

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  ); 
}

