import React from "react";
import { View, Text, Pressable } from "react-native";
import { formatarData } from "@/shared/utils/formatarData";
import { Meta } from "@/domain/models/comercial/Meta";
import {
  MetaStatusEnum,
  MetaTipoEnum,
} from "@/domain/enum/comercial/Meta.enum";
import { cn } from "@/presentation/utils/cn";
import Icon, { IconTypes } from "../../ui/Icon";
import MetaConsts from "@/shared/constants/meta.consts";

interface Props {
  meta: Meta;
  onPress?: () => void;
}

export const MetaItem: React.FC<Props> = ({ meta, onPress }) => {
  const progresso = Math.min((meta.valorAtual / meta.valorAlvo) * 100, 100);
  const statusText = MetaConsts.Status.get(meta.status);
  const iconName: IconTypes =
    meta.tipo === MetaTipoEnum.VENDA ? "attach-money" : "agriculture";

  function getStatusColor() {
    switch (meta.status) {
      case MetaStatusEnum.NAO_ALCANCADA:
        return "color-agroflow-red";
      case MetaStatusEnum.ALCANCADA:
        return "color-agroflow-green";
      default:
        return "";
    }
  }

  return (
    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Icon name={iconName} size={20} color="#4B5563"></Icon>

          <Text className="pl-2 text-lg font-semibold text-gray-900">
            {meta.titulo}
          </Text>
        </View>

        <Text className={`text-sm font-bold ${getStatusColor()}`}>
          {statusText}
        </Text>
      </View>

      <Text className="text-sm text-gray-800 mt-1">
        {meta.valorAtual} / {meta.valorAlvo} ({Math.round(progresso)}%)
      </Text>

      {/* Barra de progresso */}
      <View className="w-full h-2 bg-gray-400 rounded-full mt-1">
        <View
          className="h-2 rounded-full bg-agroflow-orange"
          style={{ width: `${progresso}%` }}
        />
      </View>

      <Text className="flex justify-center align-middle text-sm text-gray-600 mt-2">
        {formatarData(new Date(meta.dataInicio))}
        {"  "}à {formatarData(new Date(meta.dataFim))}
      </Text>

      <Pressable
        onPress={onPress}
        className="mt-4 self-end px-4 py-1.5 rounded-full bg-agroflow-green"
      >
        <Text className="text-white text-sm font-medium">Ver Detalhes</Text>
      </Pressable>
    </View>
  );
};
