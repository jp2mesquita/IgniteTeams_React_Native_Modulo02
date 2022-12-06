
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';

import { Container } from './styles';
import { Alert } from 'react-native';

export function Groups() {
  return (
    <Container>
      <Header />
      <HighLight 
        title='Turmas'
        subTitle='Jogue com a sua turma'
      />

      <GroupCard title='Galera do Ignite' onPress={() => Alert.alert("Open Card")}/>
    </Container>
  );
}

