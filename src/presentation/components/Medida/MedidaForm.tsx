import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, Text } from "react-native";
import React from "react";
import { Loading } from "../ui/Loading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useMedida } from "@/presentation/contexts/MedidaContext";
import { Medida } from "@/domain/models/Medida";
import {
  UnidadeMedidaInserirDTO,
  MedidaSchema,
} from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaInserirDTO";
import {
  UnidadeMedidaAtualizarDTO,
  UnidadeMedidaAtualizarSchema,
} from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaAtualizarDTO";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";

interface MedidaFormProps {
  medida?: Medida;
  onCancel?: () => void;
}

const useMedidaForm = (medida: Medida | undefined) => {
  return useForm<UnidadeMedidaInserirDTO | UnidadeMedidaAtualizarDTO>({
    resolver: zodResolver(
      !!medida ? UnidadeMedidaAtualizarSchema : MedidaSchema
    ),
    defaultValues: {
      id: medida?.id,
      nome: medida?.nome ?? "",
      sigla: medida?.sigla ?? "",
    },
  });
};

export default function MedidaForm({ medida, onCancel }: MedidaFormProps) {
  const { user } = useAuth();
  const { adicionar, atualizar } = useMedida();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMedidaForm(medida);

  const userCanEdit =
    user?.setor === UsuarioSetorEnum.ADMIN ||
    user?.setor === UsuarioSetorEnum.PRODUCAO;
  const readOnly = !userCanEdit;

  const onSubmit = async (
    data: UnidadeMedidaInserirDTO | UnidadeMedidaAtualizarDTO
  ) => {
    console.log("medida data", data);
    try {
      Loading.show();
      const success = !!medida
        ? await atualizar(data as UnidadeMedidaAtualizarDTO)
        : await adicionar(data as UnidadeMedidaInserirDTO);
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
            label="Medida"
            readOnly={readOnly}
            value={value}
            onValueChanged={onChange}
            error={errors.nome?.message}
            placeholder="Ex: Quilograma, litro, unidade"
          />
        )}
      />
      <Controller
        control={control}
        name="sigla"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Sigla"
            readOnly={readOnly}
            value={value}
            onValueChanged={onChange}
            error={errors.sigla?.message}
            placeholder="Ex: Kg, L, un"
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
        {userCanEdit && (
          <Button
            className="flex-1"
            text="Salvar"
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </View>
    </View>
  );
}
