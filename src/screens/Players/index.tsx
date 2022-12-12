import { useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

type  RouteParams = {
  group: string
}

export function Players(){
  const [ team, setTeam ] = useState('Time A')
  const [ players, setPlayers ] = useState(['Vini', 'Ana', 'Rodrigo', 'Brabu', 'Biro', 'Jhony', 'CrazyBoy'])

  const route  =  useRoute()
  const { group } = route.params as RouteParams

  return(
    <Container>
      <Header showBackButton/>

      <HighLight 
        title={group}
        subTitle="Adicione  a galera e separe os times"
      />

      <Form>
        <Input 
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon
          icon="add" 
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

      <FlatList 
        data={players}
        keyExtractor={item =>item }
        renderItem={({ item }) => (
          <PlayerCard 
            name={item}
            onRemove={() => {}}
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

      <Button 
        title="Remover Turma"
        type="SECONDARY"
      />

    </Container>
  )
}