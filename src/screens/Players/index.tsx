import { useState } from "react";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, PlayersNumber } from "./styles";
import { Header } from "../../components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";

  type RouteParams = {
    group: string;
  }

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;
  

  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title={group} 
        subtitle="Adicione a galera e separe os times" 
      />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false} //Corretor não vai corrigir o nome
        />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />}
          horizontal
        />
        <PlayersNumber>{players.length}</PlayersNumber>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <PlayerCard name={item} onRemove={() => {}} />}
        ListEmptyComponent={() => <ListEmpty message="Não há pessoas nessa turma" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button type="SECONDARY" title="Remover turma" />
    </Container>
  );
}
