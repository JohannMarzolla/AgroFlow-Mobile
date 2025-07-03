import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable,} from "react-native";
import { ShowToast } from "../ui/Toast";
import React, { useState } from "react";
import { Loading } from "../ui/Loading";
import { useMedida } from "@/presentation/contexts/MedidaContext";

const medidaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sigla: z.string().min(1, "sigla é obrigatório"),

});

type MedidaFormData = z.infer<typeof medidaSchema>;

export default function MedidaForm() {
  const { adicionar } = useMedida();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MedidaFormData>({
    resolver: zodResolver(medidaSchema),
    defaultValues: {
      nome: "",
      sigla:""
     
    }
  });

  const onSubmit = async (data: MedidaFormData) => {
    try {
      Loading.show()
      setLoading(true);
      await adicionar(data);
      ShowToast("success", "Medida cadastrado com sucesso!");
      reset();
      Loading.hide()
    } catch (error) {
      console.error("Erro ao adicionar Medida", error);
      ShowToast("error", "Erro ao salvar a Medida.");
      Loading.hide()
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <View >
        <Text className="text-xl font-semibold mb-2 ">Nome da Medida</Text>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-1 "
              placeholder="Ex: Quilograma, litro, unidade"
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
           <Text className="text-xl font-semibold mb-2 ">Nome da Sigla</Text>
        <Controller
          control={control}
          name="sigla"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-1 "
              placeholder="Ex: Kg, L, un"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!loading}
            />
          )}
        />
        {errors.sigla && (
          <View className="flex flex-row items-center mt-1">
            <Text className="text-red-500 ml-1 text-x">{errors.sigla.message}</Text>
          </View>
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