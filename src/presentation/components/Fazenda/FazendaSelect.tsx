import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { SelectOption } from "@/shared/models/SelectOption";
import { FazendaLista } from "./FazendaLista";
import { Fazenda } from "@/domain/models/Fazenda";
import Modal from "@/presentation/components/ui/Modal";
import InputLabel from "@/presentation/components/ui/InputLabel";

interface FazendaSelectProps {
  /** Texto do label */
  label?: string;
  /** Especifica se o texto do label deve ficar em negrito(bold). */
  labelTextBold?: boolean;
  /** Valor da opção selecionada */
  value?: any;
  /** Erro */
  error?: string;
  /** Especifica se o valor deve ser apenas leitura. */
  readOnly?: boolean;
  /** Estilo */
  style?: "ligth" | "dark";
  /** Evento de alteração do valor. */
  onValueChanged?: (value: any) => void;
}

export default function FazendaSelect({
  label,
  labelTextBold,
  value,
  error,
  readOnly,
  style = "dark",
  onValueChanged,
}: FazendaSelectProps) {
  const { fazenda } = useFazenda();
  const [modalVisible, setModalVisible] = useState(false);

  const selectOptions: SelectOption[] = fazenda.map((item) => ({
    label: item.nome,
    value: item.id,
  }));

  const selected = selectOptions.find((opt) => opt.value === value);

  function handleSelect(option: Fazenda) {
    setModalVisible(false);
    if (onValueChanged) onValueChanged(option.id);
  }

  function getBorderStyle() {
    if (readOnly) return "border-agroflow-gray";
    return style === "ligth"
      ? "border-agroflow-light-blue"
      : "border-agroflow-green";
  }

  return (
    <View className="gap-1 w-full">
      {label && <InputLabel text={label} textBold={labelTextBold} />}

      <Pressable
        disabled={readOnly}
        className={`border rounded-lg px-4 py-3 ${getBorderStyle()}`}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selected?.label || "Selecione..."}</Text>
      </Pressable>

      {error && <Text className="text-red-500">{error}</Text>}

      <Modal
        title="Selecionar Fazenda"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <FazendaLista onPress={(fazenda) => handleSelect(fazenda)} />
      </Modal>
    </View>
  );
}
