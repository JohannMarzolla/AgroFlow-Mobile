import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { ShowToast } from "@/presentation/components/ui/Toast";
import React from "react";
import { Loading } from "@/presentation/components/ui/Loading";
import {
  MetaInserirDTO,
  MetaInserirSchema,
} from "@/application/dtos/comercial/MetaInserirDTO";
import {
  MetaCalculoPorEnum,
  MetaTipoEnum,
} from "@/domain/enum/comercial/Meta.enum";
import { useMeta } from "@/presentation/contexts/comercial/MetaContext";
import InputSelect from "@/presentation/components/ui/InputSelect";
import MetaSelectData from "@/shared/constants/meta-select-data";
import Button from "@/presentation/components/ui/Button";
import Input from "@/presentation/components/ui/Input";
import InputDate from "@/presentation/components/ui/InputDate";
import InputTextArea from "@/presentation/components/ui/InputTextArea";
import FazendaSelect from "@/presentation/components/Fazenda/FazendaSelect";

interface MetaFormProps {
  onCancel?: () => void;
}

const useMetaForm = () => {
  return useForm<MetaInserirDTO>({
    resolver: zodResolver(MetaInserirSchema),
    defaultValues: {
      tipo: MetaTipoEnum.PRODUCAO,
      calculoPor: MetaCalculoPorEnum.QUANTIDADE,
      titulo: "",
      valorAlvo: 0,
      dataInicio: new Date(),
      dataFim: new Date(),
    },
  });
};

export default function MetaForm({ onCancel }: MetaFormProps) {
  const { adicionar } = useMeta();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMetaForm();

  const onSubmit = async (data: MetaInserirDTO) => {
    try {
      Loading.show();
      const success = await adicionar(data);
      if (success) reset();
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="tipo"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Tipo"
            options={MetaSelectData.Tipos}
            value={value}
            onValueChanged={onChange}
            error={errors.tipo?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="titulo"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Título"
            value={value}
            onValueChanged={onChange}
            error={errors.titulo?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="descricao"
        render={({ field: { onChange, value } }) => (
          <InputTextArea
            label="Descrição"
            value={value}
            onValueChanged={onChange}
            error={errors.descricao?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="calculoPor"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Calcular por"
            options={MetaSelectData.CalculoPor}
            value={value}
            onValueChanged={onChange}
            error={errors.calculoPor?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="valorAlvo"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Valor alvo"
            type="number"
            value={value}
            onValueChanged={onChange}
            error={errors.valorAlvo?.message}
          />
        )}
      />
      <View className="flex-row gap-3 min-w-0">
        <Controller
          control={control}
          name="dataInicio"
          render={({ field: { onChange, value } }) => (
            <InputDate
              className="flex-1"
              label="Data início"
              value={value}
              onValueChanged={onChange}
              error={errors.dataInicio?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="dataFim"
          render={({ field: { onChange, value } }) => (
            <InputDate
              className="flex-1"
              label="Data final"
              value={value}
              onValueChanged={onChange}
              error={errors.dataFim?.message}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="fazendaId"
        render={({ field: { onChange, value } }) => (
          <FazendaSelect
            label="Fazenda"
            value={value}
            onValueChanged={onChange}
            error={errors.fazendaId?.message}
          />
        )}
      />

      <View className="flex-row gap-3 min-w-0">
        <Button
          className="flex-1 "
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
