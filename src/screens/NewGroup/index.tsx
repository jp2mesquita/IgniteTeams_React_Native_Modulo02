import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { groupCreate } from "@storage/group/groupCreate";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { AppError } from "@utils/appError";
import { Alert } from "react-native";

export function NewGroup(){
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  async function handleNew(){
    if (group.trim().length === 0 ) {
      return Alert.alert('Novo Grupo', 'Informe o node da turma.')
    }


    try {
      await groupCreate(group)
      navigate('players', { group })

    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo Grupo', error.message)
      }else{
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo')

        console.log(error)
      }
    }
  }



  return(
    <Container>
      <Header showBackButton/>

      <Content>
        <Icon />

        <HighLight 
          title="Nova turma"
          subTitle="Crie  a  turma para adicionar as pessoas"
        />

        <Input 
          placeholder="Nome da turma"
          onChangeText={text => setGroup(text)}
        />

        <Button  
          title="Criar"
          style={ { marginTop: 16}}
          onPress={handleNew}
        />
        
      </Content>
    </Container>
  )
}