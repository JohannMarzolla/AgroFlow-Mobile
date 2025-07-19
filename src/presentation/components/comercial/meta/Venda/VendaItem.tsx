import React from "react";
import { View, Text} from "react-native";
import { Venda } from "@/domain/models/comercial/Venda";

interface VendaItemProps {
  venda: Venda;
 
}

export default function VendaItem({ venda }: VendaItemProps) {
  return (
    <View className="rounded-2xl p-4 mb-4 bg-gray-200 shadow-sm">
    <View className="flex-row justify-between items-start">
      <View className="flex-1 pr-2">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          {venda.cliente}
        </Text>

        {venda.dataVenda ? (
          <View className="mb-2">
            <Text className="text-base text-gray-600">Data da Venda</Text>
            <Text className="text-sm text-gray-800">
              {new Date(venda.dataVenda).toLocaleDateString()}
            </Text>
          </View>
        ) : (
          <Text className="text-sm italic text-gray-500 mb-2">
            Data não informada
          </Text>
        )}

        <View className="mb-2">
          <Text className="text-base text-gray-600">Valor Total</Text>
          <Text className="text-sm text-gray-800">
            R$ {venda.valorTotal?.toFixed(2)}
          </Text>
        </View>

        <View className="mb-2">
          <Text className="text-base text-gray-600">Status</Text>
          <Text className="text-sm text-gray-800">{venda.status}</Text>
        </View>
      </View>

      <View className="flex-1">
        <Text className="text-base font-medium text-gray-700 mb-1">
          Produtos
        </Text>
        {venda.itens && venda.itens.length > 0 ? (
          venda.itens.map((item) => (
            <Text key={item.id} className="text-sm text-gray-700 ml-2">
              • {item.produtoId}
            </Text>
          ))
        ) : (
          <Text className="text-sm italic text-gray-500">
            Sem produtos cadastrados
          </Text>
        )}
      </View>
    </View>
  </View>
);
}