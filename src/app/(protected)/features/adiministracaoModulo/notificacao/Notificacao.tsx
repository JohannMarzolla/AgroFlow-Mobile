import React from "react";
import { View, FlatList } from "react-native";
import { useNotificacaoContext } from "@/presentation/contexts/outros/NotificacaoContext";
import { NotificacaoItem } from "@/presentation/components/outros/notificacao/NotificacaoItem";
import PageHeader from "@/presentation/components/ui/PageHeader";

export default function Notificacao() {
  const { notificacoes } = useNotificacaoContext();

  return (
    <View className="flex-1 bg-white">
      <PageHeader pageName="Notificações"></PageHeader>

      <FlatList
        data={notificacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificacaoItem notificacao={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
      />
    </View>
  );
}
