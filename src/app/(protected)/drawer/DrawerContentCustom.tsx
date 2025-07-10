import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { MenuItem } from "@/presentation/models/MenuItem";

const menuItems: MenuItem[] = [
  {
    label: "Home",
    screen: "Home",
  },
  {
    label: "Produção",
    submenuKey: "producao",
    submenu: [
      { label: "Fazenda", screen: "Fazenda" },
      { label: "Medidas", screen: "Medidas" },
      { label: "Produtos", screen: "Produtos" },
      {
        label: "Insumo",
        screen: "Insumo",
        setores: [UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO],
      },
      {
        label: "Produção",
        screen: "Producao",
        setores: [UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO],
      },
      {
        label: "Estoque de Produtos",
        screen: "EstoqueProduto",
      },
      {
        label: "Estoque de Insumos",
        screen: "EstoqueInsumo",
        setores: [UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO],
      },
    ],
    parentScreen: "Producao",
  },
  {
    label: "Comercial",
    submenuKey: "comercial",
    setores: [UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.COMERCIAL],
    submenu: [{ label: "Meta", screen: "Meta" }],
    parentScreen: "Comercial",
  },
  {
    label: "Outros",
    submenuKey: "outros",
    submenu: [
      {
        label: "Usuarios",
        screen: "Usuario",
        setores: [UsuarioSetorEnum.ADMIN],
      },
      { label: "Notificações", screen: "Notificacao" },
    ],
    parentScreen: "Outros",
  },
  {
    label: "Sair",
    screen: "Sair",
    style: { color: "red" },
  },
];

const DrawerContentCustom = (props: DrawerContentComponentProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { user } = useAuth();

  const toggleSubmenu = (submenuKey: string) => {
    setOpenSubmenu(openSubmenu === submenuKey ? null : submenuKey);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {menuItems.map((item) => {
        // Verifica se o item deve ser exibido para o setor atual
        if (item.setores?.length && !item.setores?.includes(user!.setor)) {
          return null;
        }

        if (item.submenu) {
          return (
            <View key={item.label}>
              <DrawerItem
                label={item.label}
                onPress={() => toggleSubmenu(item.submenuKey!)}
                labelStyle={styles.menuText}
              />
              {openSubmenu === item.submenuKey && (
                <View style={styles.submenu}>
                  {item.submenu.map((sub) => {
                    // Verifica se o item deve ser exibido para o setor atual
                    if (
                      sub.setores?.length &&
                      !sub.setores?.includes(user!.setor)
                    ) {
                      return null;
                    }

                    return (
                      <DrawerItem
                        key={sub.label}
                        label={sub.label}
                        onPress={() => {
                          props.navigation.navigate(item.parentScreen!, {
                            screen: sub.screen,
                          });
                          setOpenSubmenu(null);
                        }}
                        labelStyle={styles.submenuText}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          );
        }

        return (
          <DrawerItem
            key={item.label}
            label={item.label}
            onPress={() => {
              setOpenSubmenu(null);
              props.navigation.navigate(item.screen!);
            }}
            labelStyle={[styles.menuText, item.style || null]}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  submenu: {
    paddingLeft: 20,
  },
  submenuText: {
    fontSize: 14,
  },
});

export default DrawerContentCustom;
