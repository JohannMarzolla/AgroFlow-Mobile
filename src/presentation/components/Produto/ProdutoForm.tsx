import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, Text } from "react-native";
import React, { useState } from "react";
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
import { useInsumo } from "@/presentation/contexts/InsumoContext";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useAuth } from "@/presentation/contexts/AuthContext";

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
      insumos: produto?.insumos ?? [],
    },
  });
};

export default function ProdutoForm({ produto, onCancel }: ProdutoFormProps) {
  const { user } = useAuth();
  const { adicionar, atualizar } = useProdutos();
  const { medida } = useMedida();
  const { insumos } = useInsumo();

  const userCanEdit =
    user?.setor === UsuarioSetorEnum.ADMIN ||
    user?.setor === UsuarioSetorEnum.PRODUCAO;
  const readOnly = !userCanEdit;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useProdutoForm(produto);

  const medidaOptions: SelectOption[] = medida.map((m) => ({
    value: m.id,
    label: m.nome,
  }));
  const insumoOptions: SelectOption[] = insumos.map((i) => ({
    value: i.id,
    label: i.nome,
  }));
  const [insumosSelecionados, setInsumosSelecionados] = useState<string[]>(
    produto?.insumos || []
  );
  const [insumoSelecionado, setInsumoSelecionado] = useState<string>("");

  const handleAdicionarInsumo = () => {
    if (insumoSelecionado && !insumosSelecionados.includes(insumoSelecionado)) {
      setInsumosSelecionados((prev) => [...prev, insumoSelecionado]);
      setInsumoSelecionado("");
    }
  };

  const handleRemoverInsumo = (id: string) => {
    setInsumosSelecionados((prev) => prev.filter((i) => i !== id));
  };

  const onSubmit = async (data: ProdutoInserirDTO | ProdutoAtualizarDTO) => {
    const dadosComInsumos = {
      ...data,
      insumos: insumosSelecionados,
    };

    try {
      Loading.show();
      const success = !!produto
        ? await atualizar(dadosComInsumos as ProdutoAtualizarDTO)
        : await adicionar(dadosComInsumos as ProdutoInserirDTO);
      if (success) reset(!!produto ? dadosComInsumos : undefined);
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
            label="Produto"
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

      <View className="gap-2">
        <InputSelect
          label="Insumo"
          readOnly={readOnly}
          value={insumoSelecionado}
          options={insumoOptions}
          onValueChanged={setInsumoSelecionado}
        />
        {userCanEdit && (
          <Button text="Adicionar Insumo" onPress={handleAdicionarInsumo} />
        )}
      </View>

      <View className="mt-3">
        <Text className="font-semibold">Insumos Adicionados:</Text>
        {insumosSelecionados.length === 0 ? (
          <Text className="italic text-gray-500">
            Nenhum insumo adicionado.
          </Text>
        ) : (
          insumosSelecionados.map((id) => {
            const nome =
              insumos.find((i) => i.id === id)?.nome || "Desconhecido";
            return (
              <View
                key={id}
                className="flex-row justify-between items-center mt-2"
              >
                <Text className="text-gray-800">• {nome}</Text>
                {userCanEdit && (
                  <Button
                    text="Remover"
                    color="red"
                    onPress={() => handleRemoverInsumo(id)}
                  />
                )}
              </View>
            );
          })
        )}
      </View>
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
