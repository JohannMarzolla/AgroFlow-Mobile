import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Usuario } from "@/domain/models/outros/Usuario";
import UsuarioConsts from "@/shared/constants/usuario.consts";

interface Props {
  usuario: Usuario;
}

export const UsuarioItem: React.FC<Props> = ({ usuario }) => {
  return (
    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900 font-semibold capitalize text-lg">
          {usuario.nome}
        </Text>
        <Text className="text-gray-700">
          {UsuarioConsts.getSetorLabel(usuario.setor)}
        </Text>
      </View>

      <Text className="text-gray-500">{usuario.email}</Text>

      {usuario.primeiroAcesso && (
        <Text className="text-sm text-yellow-600 font-bold mt-1">
          Primeiro acesso pendente
        </Text>
      )}
    </View>
  );
};
