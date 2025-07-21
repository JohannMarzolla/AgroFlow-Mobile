import {
  MetaStatusFiltroEnum,
  MetaTipoEnum,
} from "@/domain/enum/comercial/Meta.enum";

export interface MetaBuscarTodosDTO {
  limite: number | null;
  ultimoId: string | null;
  tipo: MetaTipoEnum | null;
  status: MetaStatusFiltroEnum | null;
}
