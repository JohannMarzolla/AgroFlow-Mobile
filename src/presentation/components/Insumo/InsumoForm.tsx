import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable} from "react-native";
import { ShowToast } from "../ui/Toast";
import React, { useState } from "react";
import { Loading } from "../ui/Loading";
import { useInsumo } from "@/presentation/contexts/InsumoContext";
import { Picker } from "@react-native-picker/picker";
import { useMedida } from "@/presentation/contexts/MedidaContext";

const insumoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  unidadeMedida:z.object({
    id:z.string(),
    nome:z.string(),
    sigla:z.string(),
  })
});

type InsumoFormData = z.infer<typeof insumoSchema>;

export default function InsumoForm() {
  const { adicionarInsumo } = useInsumo();
  const {medida} = useMedida()
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InsumoFormData>({
    resolver: zodResolver(insumoSchema),
    defaultValues: {
      nome: "",
     
    }
  });

  const onSubmit = async (data: InsumoFormData) => {
    try {
      Loading.show()
      setLoading(true);
      await adicionarInsumo(data);
      ShowToast("success", "insumo cadastrado com sucesso!");
      reset();
      Loading.hide()
    } catch (error) {
      console.error("Erro ao adicionar insumo", error);
      ShowToast("error", "Erro ao salvar a insumo.");
      Loading.hide()
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <View >
        <Text className="text-xl font-semibold mb-2 ">Nome da nsumo</Text>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-1 "
              placeholder="Ex: Algodao, adubo "
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
          name="unidadeMedida"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              enabled={!loading}
              className="border border-gray-300 rounded"
            >
              <Picker.Item label="Selecione uma fazenda" value={undefined} />
              {medida.map((medida) => (
                <Picker.Item
                  key={medida.id}
                  label={medida.nome}
                  value={medida}
                />
              ))}
            </Picker>
          )}
        />
        {errors.unidadeMedida && (
          <Text className="text-red-500 mt-1">{errors.unidadeMedida.message}</Text>
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