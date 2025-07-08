import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

const menuItems = [
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
      { label: "Insumo", screen: "Insumo" },
      { label: "Produção", screen: "Producao" },
      { label: "Estoque de Produtos", screen: "EstoqueProduto" },
      { label: "Estoque de Insumos", screen: "EstoqueInsumo" },
    ],
    parentScreen: "Producao",
  },
  {
    label: "Comercial",
    submenuKey: "comercial",
    submenu: [{ label: "Meta", screen: "Meta" }],
    parentScreen: "Comercial",
  },
  {
    label: "Outros",
    submenuKey: "outros",
    submenu: [
      { label: "Usuarios", screen: "Usuario" },
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

  const toggleSubmenu = (submenuKey: string) => {
    setOpenSubmenu(openSubmenu === submenuKey ? null : submenuKey);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {menuItems.map((item) => {
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
                  {item.submenu.map((sub) => (
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
                  ))}
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
              props.navigation.navigate(item.screen);
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
