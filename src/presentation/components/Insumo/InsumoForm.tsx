import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import React from "react";
import { Loading } from "../ui/Loading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import { useInsumo } from "@/presentation/contexts/InsumoContext";
import { useMedida } from "@/presentation/contexts/MedidaContext";
import { Insumo } from "@/domain/models/Insumo";
import {
  InsumoInserirDTO,
  InsumoInserirBaseSchema,
} from "@/application/dtos/producao/Insumos/InsumoInserirDTO";
import {
  InsumoAtualizarDTO,
  InsumoAtualizarSchema,
} from "@/application/dtos/producao/Insumos/InsumoAtualizarDTO";
import { SelectOption } from "@/shared/models/SelectOption";

interface InsumoFormProps {
  insumo?: Insumo;
  onCancel?: () => void;
}

const useInsumoForm = (insumo: Insumo | undefined) => {
  return useForm<InsumoInserirDTO | InsumoAtualizarDTO>({
    resolver: zodResolver(!!insumo ? InsumoAtualizarSchema : InsumoInserirBaseSchema),
    defaultValues: {
      id: insumo?.id,
      nome: insumo?.nome ?? "",
      unidadeMedidaId: insumo?.unidadeMedidaId ?? "",
    },
  });
};

export default function InsumoForm({ insumo, onCancel }: InsumoFormProps) {
  const { adicionar, atualizar } = useInsumo();
  const { medida } = useMedida();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useInsumoForm(insumo);
  const readOnly = false; 

  const medidaOptions: SelectOption[] = medida.map((m) => ({
    value: m.id,
    label: m.nome,
  }));

  const onSubmit = async (data: InsumoInserirDTO | InsumoAtualizarDTO) => {
    try {
      Loading.show();
      const success = !!insumo
        ? await atualizar(data as InsumoAtualizarDTO)
        : await adicionar(data as InsumoInserirDTO);
      if (success) reset(data);
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nome do Insumo"
            readOnly={readOnly}
            value={value}
            onValueChanged={onChange}
            error={errors.nome?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="unidadeMedidaId"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Unidade de Medida"
            readOnly={readOnly}
            options={medidaOptions}
            value={value}
            onValueChanged={onChange}
            error={errors.unidadeMedidaId?.message}
          />
        )}
      />
      <View className="flex-row gap-3 min-w-0">
        <Button
          className="flex-1"
          text="Cancelar"
          color="red"
          onPress={onCancel}
        />
        <Button
          className="flex-1"
          text="Salvar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}