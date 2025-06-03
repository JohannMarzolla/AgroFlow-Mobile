import { Produto } from "@/domain/models/Produto";
import { useProducao } from "@/presentation/contexts/ProducaoContext";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { ShowToast } from "../ui/Toast";

export default function ProducaoForm() {
  const [quantidade, setQuantidade] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto>();
  const [data, setData] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const {adicionarProducao} = useProducao();
  const {produtos} = useProdutos();



  const limparCampo = () =>{
    setQuantidade(0),
    setStatus("")
    // setProdutoSelecionado(),

  }

  const handleSubmit = async () => {
    if (!produtoSelecionado) {
      ShowToast("error", "Você deve selecionar um produto.");
      return;
      }
  try {
    setLoading(true);
     console.log("produto selecionado ", produtoSelecionado)
    
     await adicionarProducao({
        quantidade: quantidade,
        status: status,
        data: new Date(),
        produto: {
          id: produtoSelecionado.id,
          nome: produtoSelecionado.nome,
          unidadeMedida: produtoSelecionado.unidadeMedida
        }
      });
    limparCampo();
  } catch (error) {
    console.error("Erro ao adicionar produto", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <View>
      <Text className="text-xl font-semibold mb-4">Nome do Produto</Text>
          <Picker
        selectedValue={produtoSelecionado}
        onValueChange={(itemValue) => setProdutoSelecionado(itemValue)}
        className="border border-gray-300 rounded mb-4"
      >
        <Picker.Item label="Selecione um produto" value="" />
        {produtos.map((produto) => (
          <Picker.Item
            key={produto.id}
            label={produto.nome}
            value={produto}
           
          />
        ))}
      </Picker>
      <Text className="text-xl font-semibold mb-4">Quantidade</Text>
     <TextInput
      className="border border-gray-300 rounded px-3 py-2 mb-4"
      placeholder="Ex: 500"
      value={quantidade.toString()}
      keyboardType="numeric"
      onChangeText={(text) => setQuantidade(Number(text))}
    />

      <Text className="text-xl font-semibold mb-4">Status de Produção</Text>
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Ex: em produção"
        value={status}
        onChangeText={setStatus}
      />

      <Pressable
        className="bg-green-600 p-3 rounded"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold">Salvar</Text>
      </Pressable>
    </View>
  );
}
