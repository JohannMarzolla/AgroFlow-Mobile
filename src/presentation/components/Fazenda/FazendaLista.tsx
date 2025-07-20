import React from "react";
import { View } from "react-native";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import FazendaItem from "@/presentation/components/Fazenda/FazendaItem";
import { Fazenda } from "@/domain/models/Fazenda";

interface FazendaListaProps {
  onPress: (fazenda: Fazenda) => void;
}

export function FazendaLista({ onPress }: FazendaListaProps) {
  const { fazenda, carregar, loading } = useFazenda();

  return (
    <View className="flex-1">
      <PaginatedList
        data={fazenda}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FazendaItem fazenda={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: Fazenda) => onPress(item)}
      />
    </View>
  );
}
