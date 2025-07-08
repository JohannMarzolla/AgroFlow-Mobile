import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Loading } from "@/presentation/components/ui/Loading";
import {
  MetaInserirDTO,
  MetaInserirSchema,
} from "@/application/dtos/comercial/meta/MetaInserirDTO";
import {
  MetaCalculoPorEnum,
  MetaStatusEnum,
  MetaTipoEnum,
} from "@/domain/enum/comercial/Meta.enum";
import { useMeta } from "@/presentation/contexts/comercial/MetaContext";
import InputSelect from "@/presentation/components/ui/InputSelect";
import Button from "@/presentation/components/ui/Button";
import Input from "@/presentation/components/ui/Input";
import InputDate from "@/presentation/components/ui/InputDate";
import InputTextArea from "@/presentation/components/ui/InputTextArea";
import FazendaSelect from "@/presentation/components/Fazenda/FazendaSelect";
import {
  MetaAtualizarDTO,
  MetaAtualizarSchema,
} from "@/application/dtos/comercial/meta/MetaAtualizarDTO";
import { Meta } from "@/domain/models/comercial/Meta";
import { DateUtils } from "@/shared/utils/date.utils";
import MetaConsts from "@/shared/constants/meta.consts";

interface MetaFormProps {
  meta?: Meta;
  onCancel?: () => void;
}

const useMetaForm = (meta: Meta | undefined) => {
  return useForm<MetaInserirDTO | MetaAtualizarDTO>({
    resolver: zodResolver(!!meta ? MetaAtualizarSchema : MetaInserirSchema),
    defaultValues: {
      id: meta?.id,
      descricao: meta?.descricao,
      fazendaId: meta?.fazendaId,
      tipo: meta?.tipo ?? MetaTipoEnum.PRODUCAO,
      calculoPor: meta?.calculoPor ?? MetaCalculoPorEnum.QUANTIDADE,
      titulo: meta?.titulo ?? "",
      valorAlvo: meta?.valorAlvo ?? 0,
      dataInicio: meta?.dataInicio ? new Date(meta.dataInicio) : new Date(),
      dataFim: meta?.dataFim
        ? new Date(meta.dataFim)
        : DateUtils.nowToEndOfMonth(),
    },
  });
};

export default function MetaForm({ meta, onCancel }: MetaFormProps) {
  const { adicionar, atualizar } = useMeta();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMetaForm(meta);
  const readOnly = isReadOnly(meta);

  function isReadOnly(meta?: Meta): boolean {
    if (!meta) return false;
    const hoje = new Date();
    const dataInicio = new Date(meta.dataInicio);
    return (
      dataInicio.getTime() < hoje.getTime() ||
      meta.status !== MetaStatusEnum.ATIVA
    );
  }

  const onSubmit = async (data: MetaInserirDTO | MetaAtualizarDTO) => {
    try {
      Loading.show();
      const success = !!meta
        ? await atualizar(data as MetaAtualizarDTO)
        : await adicionar(data as MetaInserirDTO);
      if (success) reset(data);
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="gap-4">
      {!!meta && <Input label="Status" readOnly={true} value={meta.status} />}

      <Controller
        control={control}
        name="tipo"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Tipo"
            readOnly={readOnly}
            options={MetaConsts.Tipos}
            value={value}
            onValueChanged={onChange}
            error={errors.tipo?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="fazendaId"
        render={({ field: { onChange, value } }) => (
          <FazendaSelect
            label="Fazenda"
            readOnly={readOnly}
            value={value}
            onValueChanged={onChange}
            error={errors.fazendaId?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="titulo"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Título"
            readOnly={readOnly}
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
            readOnly={readOnly}
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
            readOnly={readOnly}
            options={MetaConsts.CalculoPor}
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
            readOnly={readOnly}
            type="number"
            value={value}
            onValueChanged={onChange}
            error={errors.valorAlvo?.message}
          />
        )}
      />
      <View className="gap-1 min-w-0">
        <View className="flex-row gap-3 min-w-0">
          <Controller
            control={control}
            name="dataInicio"
            render={({ field: { onChange, value } }) => (
              <InputDate
                className="flex-1"
                label="Data início"
                readOnly={readOnly}
                value={value}
                minimumDate={new Date()}
                onValueChanged={onChange}
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
                readOnly={readOnly}
                value={value}
                onValueChanged={onChange}
              />
            )}
          />
        </View>

        {errors.dataFim?.message && (
          <Text className="w-full text-red-500">{errors.dataFim?.message}</Text>
        )}
      </View>

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
