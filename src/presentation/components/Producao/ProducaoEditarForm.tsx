import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native";
import { useProducao } from "@/presentation/contexts/ProducaoContext";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { ShowToast } from "../ui/Toast";
import { Loading } from "../ui/Loading";
import { Producao } from "@/domain/models/Producao";

// 1. Simplifique o schema para trabalhar com IDs
const producaoEditarSchema = z.object({
  fazendaId: z.string().min(1, "Fazenda é obrigatória"),
  produtoId: z.string().min(1, "Produto é obrigatório"),
  quantidade: z.coerce.number().positive("A quantidade é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
});

type ProducaoEditarFormData = z.infer<typeof producaoEditarSchema>;

interface ProducaoEditarFormProps {
  producao: Producao;
  onSubmit?: () => void;
}

export default function ProducaoEditarForm({ producao, onSubmit }: ProducaoEditarFormProps) {
  const { updateProducao } = useProducao();
  const { produtos } = useProdutos();
  const { fazenda } = useFazenda();
  const [loading, setLoading] = useState(false);
  
  const lista = ["Aguardando colheita", "Aguardando Execução", "Colhido", "Executado"];

  // 2. Use o novo schema simplificado
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProducaoEditarFormData>({
    resolver: zodResolver(producaoEditarSchema),
    defaultValues: {
      fazendaId: producao.fazenda.id,
      produtoId: producao.produto.id,
      quantidade: producao.quantidade,
      status: producao.status,
    },
  });

  const onFormSubmit = async (data: ProducaoEditarFormData) => {
    console.log("Chamando onFormSubmit");
    try {
      Loading.show();
      setLoading(true);
      
      // 3. Construa o objeto completo para atualização
      const updatedProducao: Producao = {
        ...producao,
        quantidade: data.quantidade,
        status: data.status,
        fazenda: fazenda.find(f => f.id === data.fazendaId)!,
        produto: produtos.find(p => p.id === data.produtoId)!,
      };

      console.log("Dados enviados:", updatedProducao);
      await updateProducao(updatedProducao);
      
      ShowToast("success", "Produção atualizada com sucesso!");
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      ShowToast("error", "Erro ao atualizar produção");
    } finally {
      setLoading(false);
      Loading.hide();
    }
  };

  return (
    <View className="space-y-4">
      {/* 4. Corrija os controladores dos Pickers */}
      <View>
        <Text className="text-lg font-semibold mb-2">Fazenda</Text>
        <Controller
          control={control}
          name="fazendaId"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
            >
              <Picker.Item label="Selecione uma fazenda" value="" />
              {fazenda.map((f) => (
                <Picker.Item key={f.id} label={f.nome} value={f.id} />
              ))}
            </Picker>
          )}
        />
        {errors.fazendaId && (
          <Text className="text-red-500">{errors.fazendaId.message}</Text>
        )}
      </View>

      <View>
        <Text className="text-lg font-semibold mb-2">Produto5</Text>
        <Controller
          control={control}
          name="produtoId"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
            >
              <Picker.Item label="Selecione um produto" value="" />
              {produtos.map((p) => (
                <Picker.Item key={p.id} label={p.nome} value={p.id} />
              ))}
            </Picker>
          )}
        />
        {errors.produtoId && (
          <Text className="text-red-500">{errors.produtoId.message}</Text>
        )}
      </View>

      <View>
        <Text className="text-lg font-semibold mb-2">Quantidade</Text>
        <Controller
          control={control}
          name="quantidade"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Ex: 500"
              keyboardType="numeric"
              onChangeText={onChange}
              value={value?.toString()}
            />
          )}
        />
        {errors.quantidade && (
          <Text className="text-red-500">{errors.quantidade.message}</Text>
        )}
      </View>

      <View>
        <Text className="text-lg font-semibold mb-2">Status</Text>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
            >
              <Picker.Item label="Selecione um status" value="" />
              {lista.map((status) => (
                <Picker.Item key={status} label={status} value={status} />
              ))}
            </Picker>
          )}
        />
        {errors.status && (
          <Text className="text-red-500">{errors.status.message}</Text>
        )}
      </View>

      {/* 5. Adicione um log para verificar erros de validação */}
      {Object.keys(errors).length > 0 && (
        <Text className="text-red-500">
          Erros no formulário: {JSON.stringify(errors)}
        </Text>
      )}

      <Pressable
        className="bg-green-600 p-3 rounded"
        onPress={handleSubmit(onFormSubmit)}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold">
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Text>
      </Pressable>
    </View>
  );
}