import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";

export function NewGroup(){

  const { navigate } = useNavigation()

  function handleNew(){
    navigate('players', {group: 'Aposentados'})
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