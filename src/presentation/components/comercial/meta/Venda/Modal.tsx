// src/presentation/components/ui/SelectProdutosModal.tsx
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/presentation/components/ui/Button";
import { formatarMoeda } from "@/shared/utils/formatarMoeda";

interface SelectProdutosModalProps {
  visible: boolean;
  produtos: EstoqueProduto[];
  onClose: () => void;
  onConfirm: (selecionados: EstoqueProduto[]) => void;
}

export default function SelectProdutosModal({
  visible,
  produtos,
  onClose,
  onConfirm,
}: SelectProdutosModalProps) {
  const [selecionados, setSelecionados] = useState<EstoqueProduto[]>([]);

  const toggleSelecionado = (produto: EstoqueProduto) => {
    setSelecionados((prev) => {
      const jaTem = prev.some((p) => p.id === produto.id);
      return jaTem
        ? prev.filter((p) => p.id !== produto.id)
        : [...prev, produto];
    });
  };

  const confirmar = () => {
    if (selecionados.length > 0) {
      onConfirm(selecionados);
      setSelecionados([]);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/60 justify-center items-center p-4">
        <View className="bg-white w-full max-h-[85%] rounded-2xl overflow-hidden shadow-lg shadow-black/25">
          {/* Header */}
          <View className="flex-row justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
            <Text className="text-xl font-semibold">Selecionar Produtos</Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <Feather name="x" size={24} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Selection Info */}
          <View className="flex-row items-center p-3 px-5 bg-agroflow-light-green">
            <Feather name="shopping-cart" size={20} color="#154e39" />
            <Text className="ml-2 color-agroflow-green font-semibold text-base">
              {selecionados.length}{" "}
              {selecionados.length === 1
                ? "item selecionado"
                : "itens selecionados"}
            </Text>
          </View>

          {/* Product List */}
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = selecionados.some((p) => p.id === item.id);
              return (
                <TouchableOpacity
                  onPress={() => toggleSelecionado(item)}
                  className={`flex-row items-center py-4 px-5 ${
                    isSelected ? "bg-green-50" : "bg-white"
                  } border-b border-gray-100`}
                >
                  <View className="w-8 items-center justify-center">
                    <View
                      className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                        isSelected
                          ? "bg-green-600 border-green-600"
                          : "border-gray-400"
                      }`}
                    >
                      {isSelected && (
                        <Feather name="check" size={16} color="white" />
                      )}
                    </View>
                  </View>

                  <View className="flex-1 ml-3">
                    <Text className="text-base font-medium text-gray-800 mb-1">
                      {item.produtoNome}
                    </Text>
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <Feather name="package" size={14} color="#888" />
                        <Text className="text-gray-500 text-sm ml-1">
                          {item.quantidade} disponíveis
                        </Text>
                      </View>
                      <Text className="text-base font-bold color-agroflow-green-hover">
                        {formatarMoeda(item.precoUnitario ?? 0)}{" "}
                        {item.unidadeMedidaSigla}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View className="items-center justify-center py-10">
                <Feather name="package" size={48} color="#e0e0e0" />
                <Text className="mt-4 text-gray-800 text-base font-medium">
                  Nenhum produto disponível
                </Text>
                <Text className="mt-1 text-gray-500 text-sm">
                  Adicione produtos ao estoque
                </Text>
              </View>
            }
          />

          {/* Footer */}
          <View className="flex-row justify-between p-4 px-5 bg-gray-50 border-t border-gray-200 gap-4">
            <Button
              className="flex-1"
              text="Cancelar"
              color="red"
              onPress={onClose}
            ></Button>
            <Button
              className="flex-1"
              text={`Confirmar (${selecionados.length})`}
              onPress={confirmar}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
