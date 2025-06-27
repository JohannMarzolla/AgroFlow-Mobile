import { Picker } from "@react-native-picker/picker";
import InputLabel from "./InputLabel";
import { Text, View } from "react-native";
import { SelectOption } from "@/shared/models/SelectOption";

export type InputSelectOption = SelectOption;

export interface InputSelectOptions {
  /** Texto do label */
  label?: string;
  /** Especifica se o texto do label deve ficar em negrito(bold). */
  labelTextBold?: boolean;
  /** Placeholder */
  placeholder?: string;
  /** Valor da opção selecionada */
  value?: any;
  /** Erro */
  error?: string;
  /** Opções disponíveis */
  options?: InputSelectOption[];
  /** Especifica se o valor deve ser apenas leitura. */
  readOnly?: boolean;
  /** Estilo */
  style?: "ligth" | "dark";
  /** Evento de alteração do valor. */
  onValueChanged?: (value: any) => void;
}

export default function InputSelect(options: InputSelectOptions) {
  const style = options.style ?? "dark";

  function onValueChanged(value: any) {
    if (options.onValueChanged) options.onValueChanged(value);
  }

  function getBorderStyle() {
    if (options.readOnly) return "border-agroflow-gray";
    return style === "ligth"
      ? "border-agroflow-light-blue"
      : "border-agroflow-green";
  }

  return (
    <View className="gap-1 w-full">
      {options.label && (
        <InputLabel text={options.label} textBold={options.labelTextBold} />
      )}

      <View
        className={`bg-white justify-center w-full h-12 overflow-hidden rounded-lg border-[1px] ${getBorderStyle()}`}
      >
        {options.readOnly ? (
          <Text className="p-3 text-agroflow-gray">
            {options.options?.find((o) => o.value === options.value)?.label ||
              ""}
          </Text>
        ) : (
          <Picker
            selectedValue={options.value}
            enabled={true}
            onValueChange={onValueChanged}
          >
            <Picker.Item
              label={options.placeholder ?? "Selecione..."}
              value={null}
            />

            {options.options && options.options.length > 0 ? (
              options.options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))
            ) : (
              <Picker.Item
                label="Nenhuma opção disponível"
                value={null}
                enabled={false}
              />
            )}
          </Picker>
        )}
      </View>

      {options.error && <Text className="text-red-500">{options.error}</Text>}
    </View>
  );
}
