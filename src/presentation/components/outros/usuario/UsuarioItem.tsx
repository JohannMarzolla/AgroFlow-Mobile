import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Usuario } from "@/domain/models/outros/Usuario";
import UsuarioConsts from "@/shared/constants/usuario.consts";

interface Props {
  usuario: Usuario;
  onPress?: () => void;
}

export const UsuarioItem: React.FC<Props> = ({ usuario, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-white p-4 rounded-lg mb-3 shadow-md"
      onPress={() => onPress?.()}
    >
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-base font-semibold text-gray-800">
            {usuario.nome}
          </Text>
          <Text className="text-sm text-gray-500">{usuario.email}</Text>
          <Text className="text-sm text-gray-400 mt-1">
            Setor: {UsuarioConsts.getSetorLabel(usuario.setor)}
          </Text>
          {usuario.primeiroAcesso && (
            <Text className="text-xs text-yellow-600 font-bold mt-1">
              Primeiro acesso pendente
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
