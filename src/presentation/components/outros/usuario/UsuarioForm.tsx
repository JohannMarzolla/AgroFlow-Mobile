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

const useUsuarioForm = (usuario: Usuario | undefined) => {
  return useForm<UsuarioInserirDTO>({
    resolver: zodResolver(UsuarioInserirSchema),
    defaultValues: {
      email: usuario?.email ?? "",
      nome: usuario?.nome ?? "",
      setor: (usuario?.setor as any) ?? UsuarioSetorEnum.PRODUCAO,
    },
  });
};

export default function UsuarioForm({ usuario, onCancel }: UsuarioFormProps) {
  const { adicionar, atualizar, recuperarSenha } = useUsuario();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useUsuarioForm(usuario);

  const onSubmit = async (data: UsuarioInserirDTO) => {
    try {
      Loading.show();

      const success = !!usuario
        ? await atualizar({
            id: usuario.id,
            nome: data.nome,
            setor: data.setor,
          })
        : await adicionar(data as UsuarioInserirDTO);

      if (success) reset(data);
    } finally {
      Loading.hide();
    }
  };

  const onRecuperarAcesso = async () => {
    try {
      Loading.show();
      if (usuario) await recuperarSenha(usuario?.id);
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            readOnly={!!usuario}
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

      {!!usuario && (
        <Button
          className="flex-1"
          text="Recuperar acesso"
          color="gray"
          onPress={onRecuperarAcesso}
        />
      )}
    </View>
  );
}
