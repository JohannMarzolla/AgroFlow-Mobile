import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

import { Producao } from "@/domain/models/Producao";
import ProducaoEditarForm from "@/presentation/components/Producao/ProducaoEditarForm";

interface ProducaoEditarModalProps {
  visible: boolean;
  producao: Producao;
  onClose: () => void;
}

export default function ProducaoEditarModal({
  visible,
  producao,
  onClose,
}: ProducaoEditarModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-5 rounded-lg w-[90%] max-h-[80%]">
          <Text className="text-xl font-bold mb-4">Editar Produção</Text>

          <ProducaoEditarForm
            producao={producao}
            onSubmit={onClose}
          />

          <View className="pt-3">
            <Pressable
              className="bg-gray-500 p-3 rounded"
              onPress={onClose}
            >
              <Text className="text-white text-center">Fechar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}