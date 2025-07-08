import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import React from "react";
import { Loading } from "@/presentation/components/ui/Loading";
import InputSelect from "@/presentation/components/ui/InputSelect";
import Button from "@/presentation/components/ui/Button";
import Input from "@/presentation/components/ui/Input";
import { Usuario } from "@/domain/models/outros/Usuario";
import {
  UsuarioInserirDTO,
  UsuarioInserirSchema,
} from "@/application/dtos/outros/usuario/UsuarioInserirDTO";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useUsuario } from "@/presentation/contexts/outros/UsuarioContext";
import UsuarioConsts from "@/shared/constants/usuario.consts";

interface UsuarioFormProps {
  usuario?: Usuario;
  onCancel?: () => void;
}

const useUsuarioForm = () => {
  return useForm<UsuarioInserirDTO>({
    resolver: zodResolver(UsuarioInserirSchema),
    defaultValues: {
      email: "",
      nome: "",
      setor: UsuarioSetorEnum.PRODUCAO,
    },
  });
};

export default function UsuarioForm({ usuario, onCancel }: UsuarioFormProps) {
  const { adicionar } = useUsuario();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useUsuarioForm();

  const onSubmit = async (data: UsuarioInserirDTO) => {
    try {
      Loading.show();
      const success = await adicionar(data as UsuarioInserirDTO);
      if (success) reset(data);
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="p-6 pt-2 gap-4">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            value={value}
            onValueChanged={onChange}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nome"
            value={value}
            onValueChanged={onChange}
            error={errors.nome?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="setor"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Setor"
            options={UsuarioConsts.Setor}
            value={value}
            onValueChanged={onChange}
            error={errors.setor?.message}
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
