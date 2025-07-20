import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Venda } from "@/domain/models/comercial/Venda";
import { Feather } from "@expo/vector-icons";
import { VendaStatusEnum } from "@/domain/enum/comercial/Venda.enum";

interface VendaItemProps {
  venda: Venda;
}

export default function VendaItem({ venda }: VendaItemProps) {

  const getStatusColor = () => {
    switch (venda.status) {
      case VendaStatusEnum.VENDIDA:
        return { bg: "bg-green-50", text: "text-green-700", icon: "check-circle" };
      case VendaStatusEnum.AGUARDANDO:
        return { bg: "bg-blue-50", text: "text-blue-700", icon: "alert-circle" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", icon: "help-circle" };
    }
  };

  const statusColor = getStatusColor();
  const totalVenda = venda.valorTotal?.toFixed(2) || "0,00";

  return (
    <TouchableOpacity className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
      {/* Primeira linha - Cliente e Status */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-900 max-w-[70%]">
          {venda.cliente || "Cliente não informado"}
        </Text>
        
        <View className={`flex-row items-center px-3 py-1 rounded-full ${statusColor.bg}`}>
          <Feather 
            name={statusColor.icon as any} 
            size={16} 
            className={statusColor.text} 
          />
          <Text className={`text-xs font-medium ml-1 ${statusColor.text}`}>
            {venda.status}
          </Text>
        </View>
      </View>

      {/* Segunda linha - Valor e Data */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Feather name="dollar-sign" size={20} color="#4B5563" />
          <Text className="text-xl font-bold text-gray-900 ml-2">
            R$ {totalVenda}
          </Text>
        </View>
        
        <View className="flex-row items-center">
          <Feather name="calendar" size={16} color="#4B5563" />
          <Text className="text-gray-600 ml-2">
            {venda.dataVenda ? new Date(venda.dataVenda).toLocaleDateString('pt-BR') : "N/D"}
          </Text>
        </View>
      </View>

      {/* Terceira linha - Produtos */}
      <View className="mb-3">
        <View className="flex-row items-center mb-2">
          <Feather name="package" size={16} color="#4B5563" />
          <Text className="text-gray-600 ml-2">
            {venda.itens?.length || 0} {venda.itens?.length === 1 ? 'item' : 'itens'}
          </Text>
        </View>
        
        {venda.itens && venda.itens.length > 0 && (
          <View className="flex-row flex-wrap gap-2">
            {venda.itens.slice(0, 3).map((item, index) => (
              <View> 
                key={`${item.id}-${index}`} 
                className="bg-gray-100 rounded-lg px-3 py-1 mr-2 mb-2"
                <Text className="text-gray-700 text-sm">
                {item.produtoNome || `Produto ${index + 1}`}
                </Text>
              </View>
            ))}
            
            {venda.itens.length > 3 && (
              <View className="bg-gray-100 rounded-lg px-3 py-1">
                <Text className="text-gray-500 text-sm">
                  +{venda.itens.length - 3} mais
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
     
    </TouchableOpacity>
  );
}