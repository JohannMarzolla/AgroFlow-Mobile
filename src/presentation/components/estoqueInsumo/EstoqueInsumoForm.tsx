import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducao } from "@/presentation/contexts/EstoqueInsumoContext";
import { useInsumo } from "@/presentation/contexts/InsumoContext";
import { ShowToast } from "../ui/Toast";
import { Loading } from "../ui/Loading";
import { Picker } from "@react-native-picker/picker";

const estoqueInsumoSchema = z.object({
  insumo: z.object({
    id: z.string(),
    nome: z.string(),
    unidadeMedida: z.object({
      id: z.string(),
      nome: z.string(),
      sigla: z.string(),
    }),
  }),
  quantidade: z.coerce.number().min(1, "Quantidade obrigatória"),
  preco: z.coerce.number().min(0, "Preço obrigatório"),
});

type EstoqueInsumoFormData = z.infer<typeof estoqueInsumoSchema>;

export default function EstoqueInsumoForm() {
  const { adicionarEstoqueInsumo } = useProducao();
  const { insumos } = useInsumo();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EstoqueInsumoFormData>({
    resolver: zodResolver(estoqueInsumoSchema),
    defaultValues: {
      quantidade: 0,
      preco: 0,
    },
  });

  const onSubmit = async (data: EstoqueInsumoFormData) => {
    try {
      Loading.show();
      setLoading(true);
      await adicionarEstoqueInsumo(data);
      ShowToast("success", "Estoque de insumo cadastrado com sucesso!");
      reset();
      Loading.hide();
    } catch (error) {
      ShowToast("error", "Erro ao salvar o estoque de insumo.");
      Loading.hide();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View >
      <Text className="text-xl font-semibold mb-2">Insumo</Text>
      <Controller
          control={control}
          name="insumo"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              enabled={!loading}
              className="border border-gray-300 rounded"
            >
              <Picker.Item label="Selecione um insumo" value={undefined} />
              {insumos.map((insumo) => (
                <Picker.Item
                  key={insumo.id}
                  label={insumo.nome}
                  value={insumo.id}
                />
              ))}
            </Picker>
          )}
        />
        {errors.insumo && (
          <Text className="text-red-500 mt-1">{errors.insumo.message}</Text>
        )}
      <Text className="text-xl font-semibold mb-2">Quantidade</Text>
      <Controller
        control={control}
        name="quantidade"
        render={({ field: { onChange,onBlur , value } }) => (
          <Pressable>
             <TextInput
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Ex: 500"
              keyboardType="numeric"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value?.toString()}
              editable={!loading}
            />
          </Pressable>
        )}
      />
      {errors.quantidade && <Text className="text-red-500 mt-1">{errors.quantidade.message}</Text>}

      <Text className="mb-2 mt-4 font-semibold">Preço</Text>
      <Controller
        control={control}
        name="preco"
        render={({ field: { onChange, onBlur ,value } }) => (
          <Pressable>
          <TextInput
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Ex: 500"
              keyboardType="numeric"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value?.toString()}
              editable={!loading}
            />
          </Pressable>
        )}
      />
      {errors.preco && <Text className="text-red-500">{errors.preco.message}</Text>}

      <Pressable
        className="bg-green-600 px-6 py-3 rounded-lg mt-6"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-white text-lg font-semibold text-center">
          {loading ? "Salvando..." : "Salvar"}
        </Text>
      </Pressable>
    </View>
  );
}
