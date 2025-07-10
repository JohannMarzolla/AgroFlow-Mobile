import React from "react";
import { View, Text } from "react-native";
import { formatarData, FormatoDataEnum } from "@/shared/utils/formatarData";
import { Notificacao } from "@/domain/models/outros/Notificacao";

interface Props {
  notificacao: Notificacao;
}

export function NotificacaoItem({ notificacao }: Props) {
  return (
    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="font-semibold text-gray-900 text-lg">
            {notificacao.titulo}
          </Text>
          <Text className="text-gray-800 mt-1">{notificacao.descricao}</Text>
        </View>
      </View>

      <View className="flex-row justify-between mt-3">
        <Text className="text-sm text-gray-500">
          {formatarData(
            new Date(notificacao.dataEnvio),
            FormatoDataEnum.PADRAO
          )}
        </Text>
        {/* Badge "Nova" */}
        {!notificacao.lida && (
          <View className="ml-2 bg-blue-500 rounded-full px-2 py-1">
            <Text className="text-xs text-white font-bold">Nova</Text>
          </View>
        )}
      </View>
    </View>
  );
}
