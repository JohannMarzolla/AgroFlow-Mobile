import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable, ActivityIndicator} from "react-native";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { ShowToast } from "../ui/Toast";
import React, { useState } from "react";

const produtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  unidadeMedida: z.string().min(1, "Unidade de medida é obrigatória"),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

export default function ProdutoForm() {
  const { adicionarProduto } = useProdutos();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: "",
      unidadeMedida: ""
    }
  });

  const onSubmit = async (data: ProdutoFormData) => {
    try {
      setLoading(true);
      await adicionarProduto(data);
      ShowToast("success", "Produto cadastrado com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao adicionar produto", error);
      ShowToast("error", "Erro ao salvar o produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <View >
        <Text className="text-xl font-semibold mb-2 ">Nome do Produto</Text>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-1 "
              placeholder="Ex: Arroz"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!loading}
            />
          )}
        />
        {errors.nome && (
          <View className="flex flex-row items-center mt-1">
            <Text className="text-red-500 ml-1 text-x">{errors.nome.message}</Text>
          </View>
        )}
      
      <View className="mb-6">
        <Text className="text-xl font-semibold mb-2">Unidade de Medida</Text>
        <Controller
          control={control}
          name="unidadeMedida"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-1 "
              placeholder="Ex: kg, un, pacote"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!loading}
            />
          )}
        />
        {errors.unidadeMedida && (
          <View className="flex flex-row items-center mt-1">
            <Text className="text-red-500 ml-1 text-x">{errors.unidadeMedida.message}</Text>
          </View>
        )}
      </View>

      <Pressable
        className={`p-4 rounded-lg flex-row justify-center items-center ${loading ? "bg-gray-400" : "bg-green-600"}`}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Text className="text-white font-medium">Salvar</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}