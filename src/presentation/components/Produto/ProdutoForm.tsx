import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable, ActivityIndicator} from "react-native";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { ShowToast } from "../ui/Toast";
import React, { useState } from "react";
import { Loading } from "../ui/Loading";
import { useMedida } from "@/presentation/contexts/MedidaContext";
import { Picker } from "@react-native-picker/picker";
import { ProdutoInserirDTO } from "@/application/dtos/producao/Produtos/ProdutoInserirDTO";



const produtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  unidadeMedidaId:  z.string().min(1, "Nome é obrigatório"),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

export default function ProdutoForm() {
  const { adicionar } = useProdutos();
  const {medida} = useMedida();
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
     
    }
  });

  const onSubmit = async (data: ProdutoInserirDTO) => {
    try {
      Loading.show()
      setLoading(true);
      await adicionar(data);
      ShowToast("success", "Produto cadastrado com sucesso!");
      reset();
      Loading.hide()
    } catch (error) {
      console.error("Erro ao adicionar produto", error);
      ShowToast("error", "Erro ao salvar o produto.");
      Loading.hide()
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
      
     <Controller
          control={control}
          name="unidadeMedidaId"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              enabled={!loading}
              className="border border-gray-300 rounded"
            >
              <Picker.Item label="Selecione um produto" value={undefined} />
              {medida.map((medida) => (
                <Picker.Item
                  key={medida.id}
                  label={medida.nome}
                  value={medida.id}
                />
              ))}
            </Picker>
          )}
        />
        {errors.unidadeMedidaId && (
          <Text className="text-red-500 mt-1">{errors.unidadeMedidaId.message}</Text>
        )}
     

      <Pressable
        className={`p-4 rounded-lg flex-row justify-center items-center ${loading ? "bg-gray-400" : "bg-green-600"}`}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-white font-medium">Salvar</Text>
      </Pressable>
    </View>
  );
}