import { useProducao } from "@/presentation/contexts/ProducaoContext";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { Picker } from "@react-native-picker/picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { ShowToast } from "../ui/Toast";


const producaoSchema = z.object({
  produto: z.object({
    id: z.string(),
    nome: z.string(),
    unidadeMedida: z.string(),
  }),
  quantidade: z.coerce.number().positive("A quantidade deve ser positiva"),
  status: z.string().min(1, "Status é obrigatório"),
});

type ProducaoFormData = z.infer<typeof producaoSchema>;

export default function ProducaoForm() {
  const [loading, setLoading] = useState(false);
  const { adicionarProducao } = useProducao();
  const { produtos } = useProdutos();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProducaoFormData>({
    resolver: zodResolver(producaoSchema),
    defaultValues: {
      quantidade: 0,
      status: "",
    },
  });

  const onSubmit = async (data: ProducaoFormData) => {
    try {
      setLoading(true);
      await adicionarProducao({
        quantidade: data.quantidade,
        status: data.status,
        data: new Date(),
        produto: data.produto,
      });
      reset(); 
      ShowToast("success", "Produção adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto", error);
      ShowToast("error", "Erro ao adicionar produção");
    } finally {
      setLoading(false);
    }
  };

  return (
      <View >
        <Text className="text-xl font-semibold mb-2">Nome do Produto</Text>
        <Controller
          control={control}
          name="produto"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              enabled={!loading}
              className="border border-gray-300 rounded"
            >
              <Picker.Item label="Selecione um produto" value={undefined} />
              {produtos.map((produto) => (
                <Picker.Item
                  key={produto.id}
                  label={produto.nome}
                  value={produto}
                />
              ))}
            </Picker>
          )}
        />
        {errors.produto && (
          <Text className="text-red-500 mt-1">{errors.produto.message}</Text>
        )}
     

      <View className="mb-4">
        <Text className="text-xl font-semibold mb-2">Quantidade</Text>
        <Controller
          control={control}
          name="quantidade"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Ex: 500"
              keyboardType="numeric"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value?.toString()}
              editable={!loading}
            />
          )}
        />
        {errors.quantidade && (
          <Text className="text-red-500 mt-1">{errors.quantidade.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-xl font-semibold mb-2">Status de Produção</Text>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Ex: Em produção"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              editable={!loading}
            />
          )}
        />
        {errors.status && (
          <Text className="text-red-500 mt-1">{errors.status.message}</Text>
        )}
      </View>

      <Pressable
        className="bg-green-600 p-3 rounded mt-2"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold">
          {loading ? "Salvando..." : "Salvar"}
        </Text>
      </Pressable>
    </View>
  );
}
