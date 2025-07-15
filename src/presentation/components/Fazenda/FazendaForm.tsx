import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import React from "react";
import { Loading } from "../ui/Loading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { Fazenda } from "@/domain/models/Fazenda";
import {
  FazendaInserirDTO,
  FazendaInserirSchema,
} from "@/application/dtos/producao/fazenda/FazendaInserirDTO";
import {
  FazendaAtualizarDTO,
  FazendaAtualizarSchema,
} from "@/application/dtos/producao/fazenda/FazendaAtualizarDTO";

interface FazendaFormProps {
  fazenda?: Fazenda;
  onCancel?: () => void;
}

const useFazendaForm = (fazenda: Fazenda | undefined) => {
  return useForm<FazendaInserirDTO | FazendaAtualizarDTO>({
    resolver: zodResolver(!!fazenda ? FazendaAtualizarSchema : FazendaInserirSchema),
    defaultValues: {
      id: fazenda?.id,
      nome: fazenda?.nome ?? "",
    },
  });
};

export default function FazendaForm({ fazenda, onCancel }: FazendaFormProps) {
  const { adicionar, atualizar } = useFazenda();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFazendaForm(fazenda);
  const readOnly = false; 

  const onSubmit = async (data: FazendaInserirDTO | FazendaAtualizarDTO) => {
   
    try {
      Loading.show();
      const success = !!fazenda
        ? await atualizar(data as FazendaAtualizarDTO)
        : await adicionar(data as FazendaInserirDTO);
      if (success) reset(data);
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="gap-4">
      {!!fazenda?.criadaEm && (
        <Input label="Criada em" readOnly={true} value={new Date(fazenda.criadaEm).toLocaleDateString()} />
      )}
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nome da Fazenda"
            readOnly={readOnly}
            value={value}
            onValueChanged={onChange}
            error={errors.nome?.message}
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