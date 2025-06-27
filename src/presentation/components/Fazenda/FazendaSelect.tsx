import { useFazenda } from "@/presentation/contexts/FazendaContext";
import InputSelect from "@/presentation/components/ui/InputSelect";
import { SelectOption } from "@/shared/models/SelectOption";

interface FazendaSelectProps {
  /** Texto do label */
  label?: string;
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

export default function FazendaSelect(options: FazendaSelectProps) {
  const { fazenda } = useFazenda();

  const selectOptions: SelectOption[] = fazenda.map((item) => ({
    label: item.nome,
    value: item.id,
  }));

  function onValueChanged(value: any) {
    if (options.onValueChanged) options.onValueChanged(value);
  }

  return (
    <InputSelect
      options={selectOptions}
      label={options.label}
      error={options.error}
      readOnly={options.readOnly}
      value={options.value}
      onValueChanged={onValueChanged}
    />
  );
}
