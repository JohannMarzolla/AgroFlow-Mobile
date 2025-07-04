import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable, ActivityIndicator} from "react-native";
import { ShowToast } from "../ui/Toast";
import React, { useState } from "react";
import { Loading } from "../ui/Loading";
import { useFazenda } from "@/presentation/contexts/FazendaContext";

const fazendaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
});

type FazendaFormData = z.infer<typeof fazendaSchema>;

export default function FazendaForm() {
  const { adicionar } = useFazenda();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FazendaFormData>({
    resolver: zodResolver(fazendaSchema),
    defaultValues: {
      nome: "",
     
    }
  });

  const onSubmit = async (data: FazendaFormData) => {
    try {
      Loading.show()
      setLoading(true);
      await adicionar(data);
      ShowToast("success", "fazenda cadastrado com sucesso!");
      reset();
      Loading.hide()
    } catch (error) {
      console.error("Erro ao adicionar fazenda", error);
      ShowToast("error", "Erro ao salvar a fazenda.");
      Loading.hide()
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <View >
        <Text className="text-xl font-semibold mb-2 ">Fazenda</Text>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-1 "
              placeholder="Ex: Fazenda das laranjeiras"
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