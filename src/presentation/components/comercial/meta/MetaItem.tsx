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

interface Props {
  meta: Meta;
  onPress?: () => void;
}

export const MetaItem: React.FC<Props> = ({ meta, onPress }) => {
  const progresso = Math.min((meta.valorAtual / meta.valorAlvo) * 100, 100);

  const statusColor = {
    [MetaStatusEnum.ATIVA]: "color-agroflow-gray",
    [MetaStatusEnum.CANCELADA]: "color-agroflow-red",
    [MetaStatusEnum.INICIALIZADA]: "color-agroflow-gray",
    [MetaStatusEnum.CONCLUIDA]: "color-agroflow-green",
    [MetaStatusEnum.EXPIRADA]: "color-agroflow-red",
  }[meta.status];

  const iconName: IconTypes =
    meta.tipo === MetaTipoEnum.VENDA ? "attach-money" : "agriculture";

  return (
    <View className="bg-white p-4 mb-4 rounded-2xl shadow-md">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Icon name={iconName} size={20} color="#4B5563"></Icon>

          <Text className="pl-2 text-lg font-semibold text-gray-800">
            {meta.titulo}
          </Text>
        </View>

        <Text className={cn("text-sm font-bold", statusColor)}>
          {meta.status}
        </Text>
      </View>

      <Text className="text-sm text-gray-600 mt-1">
        {meta.valorAtual} / {meta.valorAlvo} ({Math.round(progresso)}%)
      </Text>

      {/* Barra de progresso */}
      <View className="w-full h-2 bg-gray-200 rounded-full mt-1">
        <View
          className="h-2 rounded-full bg-agroflow-orange"
          style={{ width: `${progresso}%` }}
        />
      </View>

      <Text className="flex justify-center align-middle text-sm text-agroflow-gray mt-2">
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
