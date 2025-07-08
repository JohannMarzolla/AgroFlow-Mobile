import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { SelectOption } from "../models/SelectOption";

export default class UsuarioConsts {
  static readonly Setor: SelectOption[] = [
    { value: UsuarioSetorEnum.COMERCIAL, label: "Comercial" },
    { value: UsuarioSetorEnum.PRODUCAO, label: "Produção" },
  ];

  static getSetorLabel(setor: UsuarioSetorEnum): string {
    switch (setor) {
      case UsuarioSetorEnum.PRODUCAO:
        return "Produção";
      case UsuarioSetorEnum.COMERCIAL:
        return "Comercial";
      default:
        return setor;
    }
  }
}
