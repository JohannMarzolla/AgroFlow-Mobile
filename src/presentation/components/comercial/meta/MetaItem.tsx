import React from "react";
import { View, Text, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatarData } from "@/shared/utils/formatarData";
import { Meta } from "@/domain/models/comercial/Meta";
import {
  MetaStatusEnum,
  MetaTipoEnum,
} from "@/domain/enum/comercial/Meta.enum";
import { cn } from "@/presentation/utils/cn";

interface Props {
  meta: Meta;
  onPress?: () => void;
}

export const MetaItem: React.FC<Props> = ({ meta, onPress }) => {
  const progresso = Math.min((meta.valorAtual / meta.valorAlvo) * 100, 100);

  const statusColor = {
    [MetaStatusEnum.ATIVA]: "",
    [MetaStatusEnum.CANCELADA]: "",
    [MetaStatusEnum.INICIALIZADA]: "bg-yellow-400",
    [MetaStatusEnum.CONCLUIDA]: "bg-green-500",
    [MetaStatusEnum.EXPIRADA]: "bg-red-500",
  }[meta.status];

  const tipoIcon =
    meta.tipo === MetaTipoEnum.VENDA ? (
      <Feather name="dollar-sign" size={20} color="#4B5563" />
    ) : (
      <MaterialCommunityIcons name="tractor" size={20} color="#4B5563" />
    );

  return (
    <View className="bg-white p-4 mb-4 rounded-2xl shadow-md">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          {tipoIcon}
          <Text className="text-lg font-semibold text-gray-800">
            {meta.titulo}
          </Text>
        </View>

        <Text
          className={cn("text-white text-xs px-2 py-1 rounded-md", statusColor)}
        >
          {meta.status}
        </Text>
      </View>

      <Text className="text-sm text-gray-600 mt-1">
        {meta.valorAtual} / {meta.valorAlvo} ({Math.round(progresso)}%)
      </Text>

      {/* Barra de progresso */}
      <View className="w-full h-2 bg-gray-200 rounded-full mt-1">
        <View
          className="h-2 rounded-full bg-green-500"
          style={{ width: `${progresso}%` }}
        />
      </View>

      <Text className="text-xs text-gray-500 mt-2">
        {formatarData(new Date(meta.dataInicio))} →{" "}
        {formatarData(new Date(meta.dataFim))}
      </Text>

      {/* Botão de detalhes */}
      <Pressable
        onPress={onPress}
        className="mt-4 self-end bg-green-600 px-4 py-1.5 rounded-full"
      >
        <Text className="text-white text-sm font-medium">Ver Detalhes</Text>
      </Pressable>
    </View>
  );
};
