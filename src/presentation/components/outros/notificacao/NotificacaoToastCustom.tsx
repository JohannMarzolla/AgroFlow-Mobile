import React from "react";
import { Text, View } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";
import { NotificacaoTipoEnum } from "@/domain/enum/outros/notificacao.enum";
import Icon, { IconTypes } from "../../ui/Icon";

export function NotificacaoToastCustom({
  text1,
  text2,
  props,
}: ToastConfigParams<{ tipo: NotificacaoTipoEnum }>) {
  const tipo = props?.tipo;
  const iconByTipo: { [key in NotificacaoTipoEnum]: IconTypes } = {
    [NotificacaoTipoEnum.META_CONCLUIDA]: "attach-money",
    [NotificacaoTipoEnum.PRODUCAO_CONCLUIDA]: "agriculture",
  };

  const iconName = iconByTipo[tipo];

  return (
    <View className="flex-row items-start bg-white border-l-4 border-agroflow-green px-4 py-3 rounded-lg mx-4 shadow-md">
      <Icon
        name={iconName}
        size={24}
        color="#4B5563"
        className="mt-1 mr-3"
      ></Icon>

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{text1}</Text>
        {!!text2 && (
          <Text className="text-sm text-gray-500 mt-0.5">{text2}</Text>
        )}
      </View>
    </View>
  );
}
