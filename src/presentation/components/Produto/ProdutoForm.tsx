import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

export default function ProdutoForm() {
  const [nome, setNome] = useState<string>("");
  const [unidadeMedida, setUnidadeMedida] = useState<string>("");
  const {adicionarProduto} = useProdutos();
  const [loading, setLoading] = useState(false)

  const limparCampo = () =>{
    setNome(""),
    setUnidadeMedida("")
  }

  const handleSubmit = async () => {
  try {
    setLoading(true);
    await adicionarProduto({nome: nome.trim(), unidadeMedida: unidadeMedida.trim()});
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
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Ex: Arroz"
        value={nome}
        onChangeText={setNome}
        
      />

      <Text className="text-xl font-semibold mb-4">Unidade de Medida</Text>
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Ex: kg, unidade, pacote"
        value={unidadeMedida}
        onChangeText={setUnidadeMedida}
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
