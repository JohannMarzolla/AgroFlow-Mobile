import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { ProducaoStackParamList } from "./ProducaoStack";
import { Producao } from "@/domain/models/Producao";
import { formatarData } from "@/shared/utils/formatarData";
import { useForm, Controller } from "react-hook-form";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useProducao } from "@/presentation/contexts/ProducaoContext";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { ShowToast } from "@/presentation/components/ui/Toast";
import { Loading } from "@/presentation/components/ui/Loading";
import Icon from "@/presentation/components/ui/Icon";
import { ProducaoStatusEnum } from "@/domain/enum/producao/producao.enum";

type ProducaoDetalhesRouteProp = RouteProp<
  ProducaoStackParamList,
  "ProducaoDetalhes"
>;

const producaoEditarSchema = z.object({
  fazendaId: z.string(),
  produtoId: z.string(),
  quantidade: z.coerce.number().positive("A quantidade é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
});

type ProducaoEditarFormData = z.infer<typeof producaoEditarSchema>;

export default function ProducaoDetalhes() {
  const route = useRoute<ProducaoDetalhesRouteProp>();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { producao } = route.params;
  const { atualizar } = useProducao();
  const { produtos } = useProdutos();
  const { fazenda } = useFazenda();

  const statusList = Object.values(ProducaoStatusEnum);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProducaoEditarFormData>({
    resolver: zodResolver(producaoEditarSchema),
    defaultValues: {
      fazendaId: producao.fazendaId,
      produtoId: producao.produtoId,
      quantidade: producao.quantidade,
      status: producao.status,
    },
  });

  const onSave = async (data: ProducaoEditarFormData) => {
    try {
      Loading.show();
      setLoading(true);
      await atualizar({ ...producao, ...data });
      ShowToast("success", "Produção atualizada com sucesso!");
    } catch (error) {
      ShowToast("error", "Erro ao atualizar produção");
    } finally {
      setLoading(false);
      Loading.hide();
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Card de Informações do Sistema */}
        <View className="bg-white p-5 rounded-2xl mb-6 border border-gray-100">
          <View className="flex-row items-center mb-4">
            <Icon name="info" size={24} color="#3B82F6" />
            <Text className="text-xl font-semibold text-gray-800 ml-2">
              Informações do Sistema
            </Text>
          </View>

          <View className="space-y-3">
            <View className="flex-row justify-between pb-2 border-b border-gray-100">
              <View className="flex-row items-center">
                <Icon name="calendar-today" size={18} color="#6B7280" />
                <Text className="text-gray-600 ml-2">Criado em:</Text>
              </View>
              {/* <Text className="font-medium text-gray-800">
                {formatarData(producao.data)}
              </Text> */}
            </View>

            <View className="flex-row justify-between pb-2 border-b border-gray-100">
              <View className="flex-row items-center">
                <Icon name="refresh" size={18} color="#6B7280" />
                <Text className="text-gray-600 ml-2">Última atualização:</Text>
              </View>
              {/* <Text className="font-medium text-gray-800">
                {formatarData(producao.data)}
              </Text> */}
            </View>

            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Icon name="person" size={18} color="#6B7280" />
                <Text className="text-gray-600 ml-2">Criado por:</Text>
              </View>
              <Text className="font-medium text-gray-800">Johann Marzolla</Text>
            </View>
          </View>
        </View>

        {/* Card de Edição */}
        <View className="bg-white p-5 rounded-2xl mb-6 border border-gray-100">
          <View className="flex-row items-center mb-4">
            <Icon name="edit" size={24} color="#10B981" />
            <Text className="text-xl font-semibold text-gray-800 ml-2">
              Editar Produção
            </Text>
          </View>

          <View className="space-y-5">
            {/* Campo Fazenda */}
            <View>
              <Text className="text-base font-medium text-gray-700 mb-2 flex-row items-center">
                <Text className="ml-1">Fazenda</Text>
              </Text>
              <View
                className={`border ${
                  errors.fazendaId ? "border-red-400" : "border-gray-300"
                } rounded-lg overflow-hidden`}
              >
                <Controller
                  control={control}
                  name="fazendaId"
                  render={({ field: { onChange, value } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}
                      style={{ color: "#374151" }}
                      dropdownIconColor="#6B7280"
                    >
                      <Picker.Item
                        label="Selecione uma fazenda"
                        value=""
                        enabled={false}
                      />
                      {fazenda.map((f) => (
                        <Picker.Item key={f.id} label={f.nome} value={f.id} />
                      ))}
                    </Picker>
                  )}
                />
              </View>
              {errors.fazendaId && (
                <Text className="text-red-500 mt-1 flex-row items-center">
                  <Text className="ml-1">Selecione uma fazenda</Text>
                </Text>
              )}
            </View>

            {/* Campo Produto */}
            <View>
              <Text className="text-base font-medium text-gray-700 mb-2 flex-row items-center">
                <Text className="ml-1">Produto</Text>
              </Text>
              <View
                className={`border ${
                  errors.produtoId ? "border-red-400" : "border-gray-300"
                } rounded-lg overflow-hidden`}
              >
                <Controller
                  control={control}
                  name="produtoId"
                  render={({ field: { onChange, value } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}
                      style={{ color: "#374151" }}
                      dropdownIconColor="#6B7280"
                    >
                      <Picker.Item
                        label="Selecione um produto"
                        value=""
                        enabled={false}
                      />
                      {produtos.map((p) => (
                        <Picker.Item key={p.id} label={p.nome} value={p.id} />
                      ))}
                    </Picker>
                  )}
                />
              </View>
              {errors.produtoId && (
                <Text className="text-red-500 mt-1 flex-row items-center">
                  <Text className="ml-1">Selecione um produto</Text>
                </Text>
              )}
            </View>

            {/* Campo Quantidade */}
            <View>
              <Text className="text-base font-medium text-gray-700 mb-2 flex-row items-center">
                <Text className="ml-1">Quantidade</Text>
              </Text>
              <Controller
                control={control}
                name="quantidade"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`border ${
                      errors.quantidade ? "border-red-400" : "border-gray-300"
                    } rounded-lg px-4 py-3 text-gray-800`}
                    placeholder="Ex: 500"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value?.toString()}
                  />
                )}
              />
              {errors.quantidade && (
                <Text className="text-red-500 mt-1 flex-row items-center">
                  <Text className="ml-1">{errors.quantidade.message}</Text>
                </Text>
              )}
            </View>

            {/* Campo Status */}
            <View>
              <Text className="text-base font-medium text-gray-700 mb-2 flex-row items-center">
                <Text className="ml-1">Status</Text>
              </Text>
              <View
                className={`border ${
                  errors.status ? "border-red-400" : "border-gray-300"
                } rounded-lg overflow-hidden`}
              >
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={{ color: "#374151" }}
                      dropdownIconColor="#6B7280"
                    >
                      <Picker.Item
                        label="Selecione um status"
                        value=""
                        enabled={false}
                      />
                      {statusList.map((status) => (
                        <Picker.Item
                          key={status}
                          label={status}
                          value={status}
                        />
                      ))}
                    </Picker>
                  )}
                />
              </View>
              {errors.status && (
                <Text className="text-red-500 mt-1 flex-row items-center">
                  <Text className="ml-1">{errors.status.message}</Text>
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Botões de Ação - Design Aprimorado */}
        <View className="mb-6">
          {/* Botão Primário - Salvar */}
          <Pressable
            className={`
              flex-row justify-center items-center py-4 rounded-xl mb-3
              ${loading ? "bg-green-700" : "bg-green-600"} 
              active:opacity-80
            `}
            onPress={handleSubmit(onSave)}
            disabled={loading}
          >
            <Icon name="save" size={22} color="white" />
            <Text className="text-white text-center font-bold text-lg ml-2">
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Text>
          </Pressable>

          {/* Botões Secundários em Linha */}
          <View className="flex-row justify-between space-x-3">
            {/* Botão Excluir
            <Pressable
              className={`
                flex-1 flex-row justify-center items-center py-3 rounded-xl 
                bg-red-500/10 border border-red-300
                active:bg-red-500/20
              `}
              onPress={() => console.log("Excluir produção")}
            >
              <Ionicons name="trash" size={20} color="#EF4444" />
              <Text className="text-red-600 font-medium text-base ml-2">
                Excluir
              </Text>
            </Pressable>
             */}
            {/* Botão Voltar */}
            <Pressable
              className={`
                flex-1 flex-row justify-center items-center py-3 rounded-xl 
                bg-gray-500/10 border border-gray-300
                active:bg-gray-500/20
              `}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={20} color="#4B5563" />
              <Text className="text-gray-600 font-medium text-base ml-2">
                Voltar
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
