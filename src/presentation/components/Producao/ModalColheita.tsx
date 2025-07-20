import Input from "@/presentation/components/ui/Input";
import Button from "@/presentation/components/ui/Button";
import { useState } from "react";
import { View, Text } from "react-native";
import Modal from "@/presentation/components/ui/Modal";

interface ModalColheitaProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (dados: {
    quantidadeColhida: number;
    perdas: number;
    precoFinal: number;
    custo: number;
  }) => void;
  quantidadePlanejada: number;
  precoPlanejado: number;
}

export default function ModalColheita({
  visible,
  onClose,
  onConfirm,
}: ModalColheitaProps) {
  const [quantidadeColhida, setQuantidadeColhida] = useState(0);
  const [custo, setCusto] = useState(0);
  const [precoFinal, setPrecoFinal] = useState(0);
  const [perdas, setPerdas] = useState(0);

  const confirmar = () => {
    onConfirm({
      quantidadeColhida,
      perdas,
      precoFinal,
      custo,
    });
    onClose();
  };

  return (
    <Modal title="Informações de Colheita" visible={visible} onClose={onClose}>
      <View className="p-6">
        <Text className="text-gray-500 mb-4">
          Preencha os dados reais da colheita
        </Text>

        <View className="gap-4 pb-4">
          <Input
            label="Quantidade Colhida"
            value={quantidadeColhida.toString()}
            onValueChanged={(text) => setQuantidadeColhida(Number(text))}
            type="number"
          />

          <Input
            label="Perdas"
            value={perdas.toString()}
            onValueChanged={(text) => setPerdas(Number(text))}
            type="number"
          />

          <Input
            label="Custo de Produção (R$)"
            value={custo.toString()}
            onValueChanged={(text) => setCusto(Number(text))}
            type="number"
          />

          <Input
            label="Preço Final de Venda (R$)"
            value={precoFinal.toString()}
            onValueChanged={(text) => setPrecoFinal(Number(text))}
            type="number"
          />
        </View>

        <View className="flex-row justify-between gap-4 mt-4">
          <Button
            text="Cancelar"
            color="red"
            onPress={onClose}
            className="flex-1"
          />
          <Button text="Confirmar" onPress={confirmar} className="flex-1" />
        </View>
      </View>
    </Modal>
  );
}
