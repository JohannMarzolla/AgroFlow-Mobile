import React from "react";
import { View, Text } from "react-native";
import { formatarData, FormatoDataEnum } from "@/shared/utils/formatarData";
import { Notificacao } from "@/domain/models/outros/Notificacao";

interface Props {
  notificacao: Notificacao;
}

export function NotificacaoItem({ notificacao }: Props) {
  return (
    <View
      className={`rounded-xl p-4 mb-3 shadow-sm ${
        notificacao.lida ? "bg-white" : "bg-green-100"
      }`}
    >
      <Text className="text-base font-semibold text-zinc-800">
        {notificacao.titulo}
      </Text>

      <Text className="text-sm text-zinc-600 mt-1">
        {notificacao.descricao}
      </Text>

      <View className="flex-row justify-between mt-3">
        <Text className="text-xs text-zinc-400">
          {formatarData(
            new Date(notificacao.dataEnvio),
            FormatoDataEnum.PADRAO
          )}
        </Text>
        <Text className="text-xs text-green-700 font-bold">
          {notificacao.tipo}
        </Text>
      </View>
    </View>
  );
}
