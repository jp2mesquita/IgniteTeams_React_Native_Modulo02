import { ButtonIcon } from "@components/ButtonIcon";
import { Container, Icon, Name } from "./styles";


interface PlayerCardProps{
  name: string
  group: string
  onRemove: (name: string, group: string) => void
}



export function PlayerCard({ name, group, onRemove }: PlayerCardProps){
  return(
    <Container>
      <Icon 
        name='person'
      />
      <Name>
        {name}
      </Name>

      <ButtonIcon 
        icon="close"
        type='SECONDARY'
        onPress={() => onRemove(name, group)}
      />
    </Container>
  )
} 