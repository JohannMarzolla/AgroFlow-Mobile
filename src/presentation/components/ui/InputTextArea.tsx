import InputLabel from "./InputLabel";
import { TextInput, View, Text } from "react-native";

export interface InputTextAreaOptions {
  /** Texto do label */
  label?: string;
  /** Valor do input */
  value?: string;
  /** Placeholder */
  placeholder?: string;
  /** Estilo */
  style?: "ligth" | "dark";
  /** Erro */
  error?: string;
  /** Especifica se o valor deve ser apenas leitura. */
  readOnly?: boolean;
  /** Classes css */
  className?: string;
  /** Especifica se o texto do label deve ficar em negrito(bold). */
  labelTextBold?: boolean;
  /** Evento de alteração do valor. */
  onValueChanged?: (value: string | number) => void;
}

export default function InputTextArea(options: InputTextAreaOptions) {
  const style = options.style ?? "dark";

  function handleValueChange(value: string) {
    if (options.onValueChanged) options.onValueChanged(value);
  }

  function getReadonlyStyle() {
    return options.readOnly ? "border-agroflow-gray text-agroflow-gray" : "";
  }

  return (
    <View className={`gap-1 w-full ${options.className ?? ""}`}>
      <InputLabel text={options.label} textBold={options.labelTextBold} />

      <TextInput
        className={`w-full h-24 bg-white rounded-lg border-[1px] p-3 ${
          style === "ligth"
            ? "border-agroflow-light-blue"
            : "border-agroflow-green"
        } ${getReadonlyStyle()}`}
        keyboardType="default"
        multiline={true}
        textAlignVertical="top"
        value={String(options.value ?? "")}
        placeholder={options.placeholder}
        readOnly={options.readOnly}
        onChangeText={handleValueChange}
      />
      {options.error && <Text className="text-red-500">{options.error}</Text>}
    </View>
  );
}
