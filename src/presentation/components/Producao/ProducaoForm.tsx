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

} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { ShowToast } from "../ui/Toast";
import { Loading } from "../ui/Loading";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { ProducaoStatus } from "@/domain/enum/ProducaoStatus";


const producaoSchema = z.object({
  fazenda:z.object({
    id: z.string(),
    nome: z.string(),

  }),
  produto: z.object({
    id: z.string(),
    nome: z.string(),
    unidadeMedida: z.object({
      id:z.string(),
      nome:z.string(),
      sigla:z.string(),
    }),
  }),
  quantidade: z.coerce.number().positive("A quantidade é obrigatoria"),
  status: z.string().min(1, "Status é obrigatório"),
});

type ProducaoFormData = z.infer<typeof producaoSchema>;

export default function ProducaoForm() {
  const [loading, setLoading] = useState(false);
  const { adicionarProducao } = useProducao();
  const { produtos } = useProdutos();
  const { fazenda } = useFazenda();


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProducaoFormData>({
    resolver: zodResolver(producaoSchema),
    defaultValues: {
      quantidade: 0,
      status: ProducaoStatus.PLANEJADA,
    },
  });

  const onSubmit = async (data: ProducaoFormData) => {
    try {
      Loading.show()
      setLoading(true);
      await adicionarProducao({
        quantidade: data.quantidade,
        status: data.status,
        data: new Date(),
        produto: data.produto,
        fazenda: data.fazenda
      });
      reset(); 
      ShowToast("success", "Produção adicionada com sucesso!");
      Loading.hide()
    } catch (error) {
      console.error("Erro ao adicionar produto", error);
      ShowToast("error", "Erro ao adicionar produção");
      Loading.hide()
    } finally {
      setLoading(false);
    }
  };

  return (
      <View >
          <Text className="text-xl font-semibold mb-2">Nome da fazenda</Text>
        <Controller
          control={control}
          name="fazenda"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              enabled={!loading}
              className="border border-gray-300 rounded"
            >
              <Picker.Item label="Selecione uma fazenda" value={undefined} />
              {fazenda.map((fazenda) => (
                <Picker.Item
                  key={fazenda.id}
                  label={fazenda.nome}
                  value={fazenda}
                />
              ))}
            </Picker>
          )}
        />
        {errors.produto && (
          <Text className="text-red-500 mt-1">{errors.produto.message}</Text>
        )}
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
        <View className="border border-gray-300 rounded px-3 py-2">
          <Text >{ProducaoStatus.PLANEJADA}</Text>
        </View>
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
