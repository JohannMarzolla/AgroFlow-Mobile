import React from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEstoqueProduto } from "@/presentation/contexts/EstoqueProdutoContext";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { Loading } from "../ui/Loading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import {
  EstoqueProdutoInserirDTO,
  EstoqueProdutoInserirSchema,
} from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import {
  EstoqueProdutoAtualizarDTO,
  EstoqueProdutoAtualizarSchema,
} from "@/application/dtos/producao/EstoqueProduto/EstoqueInsumoAtualizarDTO";
import { SelectOption } from "@/shared/models/SelectOption";

interface EstoqueProdutoFormProps {
  estoqueProduto?: EstoqueProduto;
  onCancel?: () => void;
}

const useEstoqueProdutoForm = (estoqueProduto: EstoqueProduto | undefined) => {
  return useForm<EstoqueProdutoInserirDTO | EstoqueProdutoAtualizarDTO>({
    resolver: zodResolver(!!estoqueProduto ? EstoqueProdutoAtualizarSchema : EstoqueProdutoInserirSchema),
    defaultValues: {
      id: estoqueProduto?.id,
      produtoId: estoqueProduto?.produtoId ?? "",
      quantidade: estoqueProduto?.quantidade ?? 0,
      preco: estoqueProduto?.preco ?? 0,
    },
  });
};

export default function EstoqueProdutoForm({ estoqueProduto, onCancel }: EstoqueProdutoFormProps) {
  const { adicionar, atualizar } = useEstoqueProduto();
  const { produtos } = useProdutos();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useEstoqueProdutoForm(estoqueProduto);
  const readOnly = false;

  const produtoOptions: SelectOption[] = produtos.map((p) => ({
    value: p.id,
    label: p.nome,
  }));

  const onSubmit = async (data: EstoqueProdutoInserirDTO | EstoqueProdutoAtualizarDTO) => {
    try {
      Loading.show();
      const success = !!estoqueProduto
        ? await atualizar(data as EstoqueProdutoAtualizarDTO)
        : await adicionar(data as EstoqueProdutoInserirDTO);
      if (success) reset(data);
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="produtoId"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Produto"
            readOnly={readOnly}
            options={produtoOptions}
            value={value}
            onValueChanged={onChange}
            error={errors.produtoId?.message}
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