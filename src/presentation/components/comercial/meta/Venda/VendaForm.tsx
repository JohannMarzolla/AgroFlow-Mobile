import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { View, Text } from "react-native";
import { useVenda } from "@/presentation/contexts/comercial/VendaContext";
import Input from "@/presentation/components/ui/Input";
import InputDate from "@/presentation/components/ui/InputDate";
import Button from "@/presentation/components/ui/Button";
import { Loading } from "@/presentation/components/ui/Loading";
import { Venda } from "@/domain/models/comercial/Venda";
import { ItemVenda } from "@/domain/models/comercial/ItemVenda";
import { VendaInserirDTO, VendaInserirSchema } from "@/application/dtos/comercial/meta/Venda/VendaInserirDTO";
import { VendaAtualizarDTO, VendaAtualizarSchema } from "@/application/dtos/comercial/meta/Venda/VendaAtualizarDTO";
import { VendaStatusEnum } from "@/domain/enum/comercial/Venda.enum";

interface VendaFormProps {
  venda?: Venda;
  onCancel?: () => void;
}

const useVendaForm = (venda: Venda | undefined) => {
  return useForm<VendaInserirDTO | VendaAtualizarDTO>({
    resolver: zodResolver(venda ? VendaAtualizarSchema : VendaInserirSchema),
    defaultValues: {
      id: venda?.id,
      dataVenda: venda?.dataVenda ? new Date(venda.dataVenda) : new Date(),
      cliente: venda?.cliente ?? "",
      imposto: venda?.imposto ?? 0,
      valorTotal: venda?.valorTotal ?? 0,
      status: venda?.status ?? VendaStatusEnum.AGUARDANDO,
      itens: venda?.itens?.map((item: ItemVenda) => ({
        desconto: item.desconto,
        quantidade: item.quantidade,
        produtoId: item.produtoId,
        fazendaId: item.fazendaId,
        precoUnitario: item.precoUnitario,
        lucroUnitario: item.lucroUnitario,
      })) ?? [],
    },
  });
};

export default function VendaForm({ venda, onCancel }: VendaFormProps) {
  const { adicionar, atualizar } = useVenda();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useVendaForm(venda);

  const readOnly = false; 

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  const onSubmit = async (data: VendaInserirDTO | VendaAtualizarDTO) => {
    try {
      Loading.show();
      if (venda) {
        await atualizar(data as VendaAtualizarDTO);
      } else {
        await adicionar(data as VendaInserirDTO);
      }
      reset(data);
    } finally {
      Loading.hide();
    }
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="dataVenda"
        render={({ field: { onChange, value } }) => (
          <InputDate
            label="Data da Venda"
            value={value}
            onValueChanged={onChange}
            readOnly={readOnly}
          />
        )}
      />
      <Controller
        control={control}
        name="cliente"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Cliente"
            value={value}
            onValueChanged={onChange}
            readOnly={readOnly}
            error={errors.cliente?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="imposto"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Imposto"
            type="number"
            value={value}
            onValueChanged={onChange}
            readOnly={readOnly}
            error={errors.imposto?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="valorTotal"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Valor Total"
            type="number"
            value={value}
            onValueChanged={onChange}
            readOnly={readOnly}
            error={errors.valorTotal?.message}
          />
        )}
      />

      {/* Itens da venda */}
      <View>
        <Text className="text-lg font-semibold mb-2">Itens da Venda</Text>
        {fields.map((field, index) => (
          <View key={field.id} className="mb-4 border-b pb-2">
            <Controller
              control={control}
              name={`itens.${index}.produtoId`}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Produto ID"
                  value={value}
                  onValueChanged={onChange}
                  readOnly={readOnly}
                  error={errors.itens?.[index]?.produtoId?.message}
                />
              )}
            />
            <Controller
              control={control}
              name={`itens.${index}.quantidade`}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Quantidade"
                  type="number"
                  value={value}
                  onValueChanged={onChange}
                  readOnly={readOnly}
                  error={errors.itens?.[index]?.quantidade?.message}
                />
              )}
            />
            <Controller
              control={control}
              name={`itens.${index}.precoUnitario`}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Preço Unitário"
                  type="number"
                  value={value}
                  onValueChanged={onChange}
                  readOnly={readOnly}
                  error={errors.itens?.[index]?.precoUnitario?.message}
                />
              )}
            />
            <Controller
              control={control}
              name={`itens.${index}.desconto`}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Desconto"
                  type="number"
                  value={value}
                  onValueChanged={onChange}
                  readOnly={readOnly}
                  error={errors.itens?.[index]?.desconto?.message}
                />
              )}
            />
            <Controller
              control={control}
              name={`itens.${index}.lucroUnitario`}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Lucro Unitário"
                  type="number"
                  value={value}
                  onValueChanged={onChange}
                  readOnly={readOnly}
                  error={errors.itens?.[index]?.lucroUnitario?.message}
                />
              )}
            />
            <Controller
              control={control}
              name={`itens.${index}.fazendaId`}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Fazenda ID"
                  value={value}
                  onValueChanged={onChange}
                  readOnly={readOnly}
                  error={errors.itens?.[index]?.fazendaId?.message}
                />
              )}
            />
            <Button
              text="Remover Item"
              color="red"
              onPress={() => remove(index)}
            />
          </View>
        ))}
        <Button
          text="Adicionar Item"
          onPress={() =>
            append({
              desconto: 0,
              quantidade: 1,
              produtoId: "",
              fazendaId: "",
              precoUnitario: 0,
              lucroUnitario: 0,
            })
          }
        />
      </View>

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