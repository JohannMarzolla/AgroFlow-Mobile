import React from "react";
import { View } from "react-native";
import {
  NotificacaoProvider,
  useNotificacaoContext,
} from "@/presentation/contexts/outros/NotificacaoContext";
import { NotificacaoItem } from "@/presentation/components/outros/notificacao/NotificacaoItem";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PaginatedList from "@/presentation/components/ui/PaginatedList";

function Tela() {
  const { notificacoes, loading, carregar } = useNotificacaoContext();

  return (
    <View className="flex-1">
      <PageHeader pageName="Notificações"></PageHeader>

      <PaginatedList
        data={notificacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificacaoItem notificacao={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
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
