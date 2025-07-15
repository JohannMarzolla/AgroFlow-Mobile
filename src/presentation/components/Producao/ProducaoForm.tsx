import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Loading } from "@/presentation/components/ui/Loading";
import Input from "@/presentation/components/ui/Input";
import InputSelect from "@/presentation/components/ui/InputSelect";
import InputDate from "@/presentation/components/ui/InputDate";
import Button from "@/presentation/components/ui/Button";
import { useProducao } from "@/presentation/contexts/ProducaoContext";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { ShowToast } from "../ui/Toast";
import {
  ProducaoInserirDTO,
  ProducaoInserirSchema,
} from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { DateUtils } from "@/shared/utils/date.utils";
import { ProducaoStatusEnum } from "@/domain/enum/producao/producao.enum";
import { Producao } from "@/domain/models/Producao";
import { ProducaoAtualizarDTO, ProducaoAtualizarSchema } from "@/application/dtos/producao/Producao/ProducaoAtualizarDTO";

interface ProducaoFormProps {
  producao?: Producao;
  onCancel?: () => void;
}

const useProducaoForm = (producao: Producao | undefined) => {
  return useForm<ProducaoInserirDTO | ProducaoAtualizarDTO>({
    resolver: zodResolver(!!producao ? ProducaoAtualizarSchema : ProducaoInserirSchema),
    defaultValues: {
      id: producao?.id,
      quantidadePlanejada: producao?.quantidadePlanejada,
      precoPlanejado: producao?.precoPlanejado,
      status: producao?.status ?? ProducaoStatusEnum.AGUARDANDO,
      produtoId: producao?.produtoId,
      fazendaId: producao?.fazendaId,
      lote: producao?.lote,
      dataInicio: producao?.dataInicio ? new Date(producao.dataInicio) : new Date(),
      dataFim: producao?.dataFim
        ? new Date(producao.dataFim)
        : DateUtils.nowToEndOfMonth(),
      insumos: producao?.insumos ??[],
    },
  });
};

export default function ProducaoForm({ producao, onCancel }: ProducaoFormProps)  {
  const { adicionar,atualizar } = useProducao();
  const { produtos } = useProdutos();
  const { fazenda } = useFazenda();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useProducaoForm(producao);
  const readOnly = isReadOnly(producao);
 

  function isReadOnly(producao?: Producao): boolean {
    if (!producao) return false;
    const hoje = new Date();
    const dataInicio = new Date(producao.dataInicio);
    return (
      dataInicio.getTime() < hoje.getTime() 
    );
  }
  const { fields } = useFieldArray({
    control,
    name: "insumos",
  });

  const produtoId = watch("produtoId");
  const produtoSelecionado = produtos.find(p => p.id === produtoId);

  const onSubmit = async (data: ProducaoInserirDTO| ProducaoAtualizarDTO) => {
    console.log("data",data)
    try {
      Loading.show();
      const success = !!producao
        ? await atualizar(data as ProducaoAtualizarDTO)
        : await adicionar(data as ProducaoInserirDTO);
      if (success) reset(data);
    } finally {
      Loading.hide();
    }
  };

  React.useEffect(() => {
    if (produtoSelecionado) {
      setValue(
        "insumos",
        produtoSelecionado.insumosDetalhados?.map(i => ({
          insumoId: i.id,
          quantidade: 0,
        })) || []
      );
    }
  }, [produtoSelecionado]);

  return (
    <ScrollView className="p-4 gap-4">
      {/* Seleção de Fazenda */}
      <Controller
        control={control}
        name="fazendaId"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Fazenda"
            options={fazenda.map(f => ({ label: f.nome, value: f.id }))}
            value={value}
            onValueChanged={onChange}
            error={errors.fazendaId?.message}
          />
        )}
      />

      {/* Seleção de Produto */}
      <Controller
        control={control}
        name="produtoId"
        render={({ field: { onChange, value } }) => (
          <InputSelect
            label="Produto"
            options={produtos.map(p => ({ label: p.nome, value: p.id }))}
            value={value}
            onValueChanged={onChange}
            error={errors.produtoId?.message}
          />
        )}
      />

      {/* Insumos */}
      {produtoSelecionado && fields.length > 0 && (
        <View className="gap-2">
          <Text className="text-lg font-semibold">Insumos</Text>
          {fields.map((field, index) => {
            const insumo = produtoSelecionado.insumosDetalhados?.find(
              i => i.id === field.insumoId
            );
            return (
              <Controller
                key={field.id}
                control={control}
                name={`insumos.${index}.quantidade`}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={insumo?.nome || "Insumo"}
                    type="number"
                    value={value !== undefined ? value.toString() : "0"}
                    onValueChanged={text => onChange(Number(text))}
                    error={errors.insumos?.[index]?.quantidade?.message}
                  />
                )}
              />
            );
          })}
        </View>
      )}

      {/* Quantidade e Lote */}
      <Controller
        control={control}
        name="quantidadePlanejada"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Quantidade Planejada"
            type="number"
            value={value !== undefined ? value.toString() : "0"}
            onValueChanged={text => onChange(Number(text))}
            error={errors.quantidadePlanejada?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="lote"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Lote"
            value={value}
            onValueChanged={onChange}
            error={errors.lote?.message}
          />
        )}
      />
       <Controller
        control={control}
        name="precoPlanejado"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Preço Planejado (R$)"
            type="number"
            value={value !== undefined ? value.toString() : "0"}
            onValueChanged={text => onChange(Number(text))}
            error={errors.precoPlanejado?.message}
           
          />
        )}
      />

      {/* Datas */}
      <View className="flex-row gap-3">
        <Controller
          control={control}
          name="dataInicio"
          render={({ field: { onChange, value } }) => (
            <InputDate
              className="flex-1"
              label="Data Início"
              value={value}
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
              label="Data Fim"
              value={value}
              onValueChanged={onChange}
            />
          )}
        />
      </View>

      {/* Botões */}
      <View className="flex-row gap-3 mt-4">
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
    </ScrollView>
  );
}