import React from "react";
import { View, Text, FlatList } from "react-native";
import { useNotificacaoContext } from "@/presentation/contexts/outros/NotificacaoContext";
import { NotificacaoItem } from "@/presentation/components/outros/notificacao/NotificacaoItem";

export default function Notificacao() {
  const { notificacoes } = useNotificacaoContext();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
        Notificações
      </Text>

      <FlatList
        data={notificacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificacaoItem notificacao={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
      />
    </View>
  );
}
