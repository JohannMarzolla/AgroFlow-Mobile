import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import React from "react";
import { Loading } from "../ui/Loading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { useMedida } from "@/presentation/contexts/MedidaContext";
import { Produto } from "@/domain/models/Produto";
import {
  ProdutoInserirDTO,
  ProdutoSchema,
} from "@/application/dtos/producao/Produtos/ProdutoInserirDTO";
import {
  ProdutoAtualizarDTO,
  ProdutoAtualizarSchema,
} from "@/application/dtos/producao/Produtos/ProdutoAtualizarDTO";
import { SelectOption } from "@/shared/models/SelectOption";

interface ProdutoFormProps {
  produto?: Produto;
  onCancel?: () => void;
}

const useProdutoForm = (produto: Produto | undefined) => {
  return useForm<ProdutoInserirDTO | ProdutoAtualizarDTO>({
    resolver: zodResolver(!!produto ? ProdutoAtualizarSchema : ProdutoSchema),
    defaultValues: {
      id: produto?.id,
      nome: produto?.nome ?? "",
      unidadeMedidaId: produto?.unidadeMedidaId ?? "",
    },
  });
};

export default function ProdutoForm({ produto, onCancel }: ProdutoFormProps) {
  const { adicionar } = useProdutos();
  const { medida } = useMedida();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useProdutoForm(produto);
  const readOnly = false;

  const medidaOptions: SelectOption[] = medida.map((m) => ({
    value: m.id,
    label: m.nome,
  }));

  const onSubmit = async (data: ProdutoInserirDTO | ProdutoAtualizarDTO) => {
    try {
      Loading.show();
      const success = !!produto
        ? false 
        : await adicionar(data as ProdutoInserirDTO);
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
            label="Nome do Produto"
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