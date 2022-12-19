import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput, Keyboard } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppError } from "@utils/appError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGrouoAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type  RouteParams = {
  group: string
}

export function Players(){
  const [ isLoading, setIsLoading ] = useState(true)
  const [ team, setTeam ] = useState('Time A')
  const [ players, setPlayers ] = useState<PlayerStorageDTO[]>([])
  const [ newPlayerName, setNewPlayerName ] = useState('')

  const route  =  useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const { navigate } = useNavigation()

  async function handleAddPlayer(){
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Novo Player', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team: team
    }

    try {
      await playerAddByGroup(newPlayer, group)
      await fetchPlayersByTeam()

      newPlayerNameInputRef.current?.blur()
      Keyboard.dismiss()
      setNewPlayerName('')
      
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message)
      }else{
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar uma nova pessoa.')
      }
    }
  }

  async function fetchPlayersByTeam(){
    try {
      setIsLoading(true)
      const storedPlayerByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(storedPlayerByTeam)

    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time seliecionado')
    } finally{
      setIsLoading(false)
    }
  }


  async function handlePlayerRemove(playerName: string){
    try {
      await playerRemoveByGroup(playerName, group)
      await fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

  async function handleRemove() {
    try {
      await groupRemoveByName(group)
      navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Excluir', 'Não foi possível excluir este grupo no momento!')
    }
  }

  async function handleDeleteGroup(){
    Alert.alert('Excluir', `Tem certeza que deseja excluir o grupo ${group}?`, 
      [
        {
          text: 'Excluir Grupo!',
          onPress: async () => await handleRemove()
        },
        {
          text: 'Cancelar'
        }
      ],
      {
        cancelable: true
      }
    )

  }

  useEffect(() => {
    
    fetchPlayersByTeam()
  }, [team])

  return(
    <Container>
      <Header showBackButton/>

      <HighLight 
        title={group}
        subTitle="Adicione  a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={(text) => setNewPlayerName(text) }
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer} 
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item  => item}
          renderItem={({ item }) => (
            <Filter 
            title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
              />
          )}
          horizontal
        />

        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>
      
      { isLoading 
        ? <Loading />
        : <FlatList 
            data={players}
            keyExtractor={item =>item.name }
            renderItem={({ item }) => (
              <PlayerCard 
                name={item.name}
                group={group}
                onRemove={handlePlayerRemove}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty
                message="Não há pessoas neste time!"
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 30},
              players.length === 0 && { flex: 1}
            ]}
          />
          
      }


      <Button 
        title="Remover Turma"
        type="SECONDARY"
        onPress={() => handleDeleteGroup()}
      />

    </Container>
  )
}