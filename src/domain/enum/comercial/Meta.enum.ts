import { z } from "zod";

export enum MetaTipoEnum {
  VENDA = "VENDA",
  PRODUCAO = "PRODUCAO",
}

export enum MetaStatusEnum {
  ATIVA = "ATIVA",
  INICIALIZADA = "INICIALIZADA",
  CANCELADA = "CANCELADA",
  CONCLUIDA = "CONCLUIDA",
  EXPIRADA = "EXPIRADA",
}

export enum MetaCalculoPorEnum {
  VALOR = "VALOR",
  QUANTIDADE = "INICIALIZADA",
}

const MetaTipoEnumValues = [MetaTipoEnum.VENDA, MetaTipoEnum.PRODUCAO] as const;

const MetaStatusEnumValues = [
  MetaStatusEnum.ATIVA,
  MetaStatusEnum.CANCELADA,
  MetaStatusEnum.CONCLUIDA,
  MetaStatusEnum.EXPIRADA,
  MetaStatusEnum.INICIALIZADA,
] as const;

const MetaCalculoPorEnumValues = [
  MetaCalculoPorEnum.VALOR,
  MetaCalculoPorEnum.QUANTIDADE,
] as const;

export const MetaTipoEnumZod = z.enum(MetaTipoEnumValues);
export const MetaStatusEnumZod = z.enum(MetaStatusEnumValues);
export const MetaCalculoPorEnumZod = z.enum(MetaCalculoPorEnumValues);
