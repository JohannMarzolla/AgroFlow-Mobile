import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useVenda } from "@/presentation/contexts/comercial/VendaContext";
import Input from "@/presentation/components/ui/Input";
import InputDate from "@/presentation/components/ui/InputDate";
import { Loading } from "@/presentation/components/ui/Loading";
import { Venda } from "@/domain/models/comercial/Venda";
import { ItemVenda } from "@/domain/models/comercial/ItemVenda";
import { VendaInserirDTO, VendaInserirSchema } from "@/application/dtos/comercial/meta/Venda/VendaInserirDTO";
import { VendaAtualizarDTO, VendaAtualizarSchema } from "@/application/dtos/comercial/meta/Venda/VendaAtualizarDTO";
import { VendaStatusEnum } from "@/domain/enum/comercial/Venda.enum";
import { useEstoqueProduto } from "@/presentation/contexts/EstoqueProdutoContext";
import SelectProdutosModal from "./Modal";
import { Feather } from "@expo/vector-icons";

interface VendaFormProps {
  venda?: Venda;
  onCancel?: () => void;
}

const useVendaForm = (venda: Venda | undefined) => {
  return useForm<VendaInserirDTO | VendaAtualizarDTO>({
    resolver: zodResolver(venda ? VendaAtualizarSchema : VendaInserirSchema),
    defaultValues: {
      id: venda?.id,
      dataVenda: venda?.dataVenda ? new Date(venda.dataVenda) : new Date(),
      cliente: venda?.cliente ?? "",
      imposto: venda?.imposto ?? 0,
      valorTotal: venda?.valorTotal ?? 0,
      status: venda?.status ?? VendaStatusEnum.AGUARDANDO,
      itens: venda?.itens?.map((item: ItemVenda) => ({
        desconto: item.desconto,
        quantidade: item.quantidade,
        produtoId: item.produtoId,
        fazendaId: item.fazendaId,
        precoUnitario: item.precoUnitario,
        lucroUnitario: item.lucroUnitario,
      })) ?? [],
    },
  });
};

export default function VendaForm({ venda, onCancel }: VendaFormProps) {
  const { adicionar, atualizar } = useVenda();
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useVendaForm(venda);
  const [modalVisible, setModalVisible] = useState(false);
  const { estoqueProdutos } = useEstoqueProduto();
  const readOnly = false;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  const onSubmit = async (data: VendaInserirDTO | VendaAtualizarDTO) => {
    console.log("data venda front ", data)
    try {
      Loading.show();
      if (venda) {
        await atualizar(data as VendaAtualizarDTO);
      } else {
        await adicionar(data as VendaInserirDTO);
      }
      reset(data);
    } finally {
      Loading.hide();
    }
  };

  const confirmarSelecionados = (selecionados: any[]) => {
    const existingProductIds = fields.map(item => item.produtoId);
  
    selecionados.forEach(estoqueProduto => {
      if (!existingProductIds.includes(estoqueProduto.produtoId)) { // ← Usar produtoId
        append({
          produtoId: estoqueProduto.produtoId, // ← CORRETO: ID do produto
          fazendaId: estoqueProduto.fazendaId,
          quantidade: 1,
          desconto: 0,
          precoUnitario: estoqueProduto.precoUnitario ?? 0, 
          lucroUnitario: 0,
        });
      }
    });
    setModalVisible(false);
  };

  const calcularTotalVenda = () => {
    const itens = watch("itens") || [];
    return itens.reduce((total, item) => {
      return total + (item.quantidade || 0) * (item.precoUnitario || 0);
    }, 0);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Informações da Venda */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Informações da Venda</Text>

          <View className="mb-4">
            <Controller
              control={control}
              name="dataVenda"
              render={({ field: { onChange, value } }) => (
                <InputDate
                  label="Data da Venda"
                  value={value}
                  onValueChanged={onChange}
                  readOnly={readOnly}
                />
              )}
            />
          </View>

          <View className="mb-6">
            <Controller
              control={control}
              name="cliente"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Cliente"
                  value={value}
                  onValueChanged={onChange}
                  readOnly={readOnly}
                  error={errors.cliente?.message}
                />
              )}
            />
          </View>
        </View>

        {/* Seção de Produtos */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Produtos</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="flex-row items-center bg-green-600 py-2 px-4 rounded-lg"
            >
              <Feather name="plus" size={16} color="white" />
              <Text className="text-white ml-2 font-medium">Adicionar Produtos</Text>
            </TouchableOpacity>
          </View>

          {fields.length > 0 ? (
            <View className="space-y-3">
              {fields.map((item, index) => {
                const produtoInfo = estoqueProdutos.find(p => p.id === item.produtoId);
                const quantidade = watch(`itens.${index}.quantidade`);
                const precoUnitario = watch(`itens.${index}.precoUnitario`);
                const totalItem = (quantidade || 0) * (precoUnitario || 0);

                return (
                  <View
                    key={item.id}
                    className="bg-white rounded-lg p-4 shadow shadow-gray-300"
                  >
                    <View className="flex-row justify-between items-start mb-3">
                      <Text className="font-bold text-base text-gray-800 flex-1">
                        {produtoInfo?.produtoNome ?? "Produto não encontrado"}
                      </Text>
                      <TouchableOpacity onPress={() => remove(index)}>
                        <Feather name="trash-2" size={18} color="#dc2626" />
                      </TouchableOpacity>
                    </View>

                    <View className="mb-3">
                      <Controller
                        control={control}
                        name={`itens.${index}.quantidade`}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            label="Quantidade"
                            value={String(value)}
                            onValueChanged={(val) => onChange(Number(val))}
                          />
                        )}
                      />
                    </View>

                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-600">
                        Preço Unitário: R$ {precoUnitario?.toFixed(2)}
                      </Text>
                      <Text className="font-bold text-gray-800">
                        Total: R$ {totalItem.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View className="bg-gray-100 rounded-lg p-8 items-center">
              <Feather name="package" size={32} color="#9ca3af" />
              <Text className="text-gray-500 mt-2">Nenhum produto selecionado ainda.</Text>
            </View>
          )}
        </View>

        <SelectProdutosModal
          visible={modalVisible}
          produtos={estoqueProdutos}
          onClose={() => setModalVisible(false)}
          onConfirm={confirmarSelecionados}
        />
      </ScrollView>

      {/* Resumo e Botão de Finalizar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">Total da Venda</Text>
          <Text className="text-xl font-bold text-green-600">
            R$ {calcularTotalVenda().toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-green-600 rounded-lg py-4 items-center justify-center shadow-lg shadow-green-600/30"
          disabled={fields.length === 0}
        >
          <View className="flex-row items-center">
            <Feather name="check-circle" size={24} color="white" />
            <Text className="text-white text-lg font-bold ml-2">
              Finalizar Venda
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
