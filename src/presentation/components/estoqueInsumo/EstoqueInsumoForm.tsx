import React from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useInsumo } from "@/presentation/contexts/InsumoContext";
import { Loading } from "../ui/Loading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";
import {
  EstoqueInsumoInserirDTO,
  EstoqueInsumoInserirSchema,
} from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoInserirDTO";
import {
  EstoqueInsumoAtualizarDTO,
  EstoqueInsumoAtualizarSchema,
} from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoAtualizarDTO";
import { SelectOption } from "@/shared/models/SelectOption";
import { useEstoqueInsumo } from "@/presentation/contexts/EstoqueInsumoContext";

interface EstoqueInsumoFormProps {
  estoqueInsumo?: EstoqueInsumo;
  onCancel?: () => void;
}

const useEstoqueInsumoForm = (estoqueInsumo: EstoqueInsumo | undefined) => {
  return useForm<EstoqueInsumoInserirDTO | EstoqueInsumoAtualizarDTO>({
    resolver: zodResolver(!!estoqueInsumo ? EstoqueInsumoAtualizarSchema : EstoqueInsumoInserirSchema),
    defaultValues: {
      id: estoqueInsumo?.id,
      insumoId: estoqueInsumo?.insumoId ?? "",
      quantidade: estoqueInsumo?.quantidade ?? 0,
      preco: estoqueInsumo?.preco ?? 0,
    },
  });
};

export default function EstoqueInsumoForm({ estoqueInsumo, onCancel }: EstoqueInsumoFormProps) {
  const { adicionar, atualizar } = useEstoqueInsumo();
  const { insumos } = useInsumo();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useEstoqueInsumoForm(estoqueInsumo);
  const readOnly = false;

  const insumoOptions: SelectOption[] = insumos.map((i) => ({
    value: i.id,
    label: i.nome,
  }));

  const onSubmit = async (data: EstoqueInsumoInserirDTO | EstoqueInsumoAtualizarDTO) => {
    try {
      Loading.show();
      const success = !!estoqueInsumo
        ? await atualizar(data as EstoqueInsumoAtualizarDTO)
        : await adicionar(data as EstoqueInsumoInserirDTO);
      if (success) reset(data);
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="insumoId"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Insumo"
            readOnly={readOnly}
            options={insumoOptions}
            value={value}
            onValueChanged={onChange}
            error={errors.insumoId?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="quantidade"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Quantidade"
            readOnly={readOnly}
            type="number"
            value={value}
            onValueChanged={onChange}
            error={errors.quantidade?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="preco"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Preço"
            readOnly={readOnly}
            type="number"
            value={value}
            onValueChanged={onChange}
            error={errors.preco?.message}
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
