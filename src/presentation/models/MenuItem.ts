import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";

export interface MenuItem {
  label: string;
  screen?: string;
  submenuKey?: string;
  setores?: UsuarioSetorEnum[];
  submenu?: MenuItem[];
  parentScreen?: string;
  style?: object;
}
