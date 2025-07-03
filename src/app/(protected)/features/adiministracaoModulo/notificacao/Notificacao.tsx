import React from "react";
import { View, FlatList, Text } from "react-native";
import {
  NotificacaoProvider,
  useNotificacaoContext,
} from "@/presentation/contexts/outros/NotificacaoContext";
import { NotificacaoItem } from "@/presentation/components/outros/notificacao/NotificacaoItem";
import PageHeader from "@/presentation/components/ui/PageHeader";

function Tela() {
  const { notificacoes, loading } = useNotificacaoContext();

  return (
    <View className="flex-1 bg-white">
      <PageHeader pageName="Notificações"></PageHeader>

      {!notificacoes?.length && !loading && (
        <Text className="text-agroflow-gray text-center">Não há dados</Text>
      )}

      <FlatList
        data={notificacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificacaoItem notificacao={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
      />
    </View>
  );
}

export default function Notificacao() {
  return (
    <NotificacaoProvider>
      <Tela />
    </NotificacaoProvider>
  );
}
