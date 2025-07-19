// src/presentation/components/ui/SelectProdutosModal.tsx
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";

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
      return jaTem ? prev.filter((p) => p.id !== produto.id) : [...prev, produto];
    });
  };

  const confirmar = () => {
    onConfirm(selecionados);
    setSelecionados([]);
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
            <Text className="text-xl font-bold text-blue-900">Selecionar Produtos</Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <Feather name="x" size={24} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Selection Info */}
          <View className="flex-row items-center p-3 px-5 bg-blue-50">
            <Feather name="shopping-cart" size={20} color="#0066cc" />
            <Text className="ml-2 text-blue-700 font-semibold text-base">
              {selecionados.length} {selecionados.length === 1 ? 'item selecionado' : 'itens selecionados'}
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
                  className={`flex-row items-center py-4 px-5 ${isSelected ? 'bg-blue-50' : 'bg-white'} border-b border-gray-100`}
                >
                  <View className="w-8 items-center justify-center">
                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
                    }`}>
                      {isSelected && (
                        <Feather name="check" size={16} color="white" />
                      )}
                    </View>
                  </View>
                  
                  <View className="flex-1 ml-3">
                    <Text className="text-base font-medium text-gray-800 mb-1">{item.produtoNome}</Text>
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <Feather name="package" size={14} color="#888" />
                        <Text className="text-gray-500 text-sm ml-1">
                          {item.quantidade} disponíveis
                        </Text>
                      </View>
                      <Text className="text-base font-bold text-blue-900">
                        R$ {item.precoUnitario.toFixed(2)}  {item.unidadeMedidaSigla}
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
                <Text className="mt-4 text-gray-800 text-base font-medium">Nenhum produto disponível</Text>
                <Text className="mt-1 text-gray-500 text-sm">Adicione produtos ao estoque</Text>
              </View>
            }
          />

          {/* Footer */}
          <View className="flex-row justify-between p-4 px-5 bg-gray-50 border-t border-gray-200">
            <TouchableOpacity
              onPress={onClose}
              className="bg-white border border-gray-400 rounded-lg py-3 px-7 min-w-[140px] items-center justify-center shadow-sm shadow-black/10"
            >
              <Text className="text-base font-semibold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmar}
              className="bg-blue-600 rounded-lg py-3 px-7 min-w-[140px] items-center justify-center shadow-sm shadow-black/10"
              disabled={selecionados.length === 0}
            >
              <Text className="text-base font-semibold text-white">
                Confirmar ({selecionados.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}