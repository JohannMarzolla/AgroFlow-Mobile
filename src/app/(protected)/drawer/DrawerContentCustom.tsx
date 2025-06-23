import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

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
      <DrawerItem
        label="Home"
        onPress={() => {
          setOpenSubmenu(null);
          props.navigation.navigate("Home");
        }}
        labelStyle={styles.menuText}
      />

      <DrawerItem
        label="Produção"
        onPress={() => toggleSubmenu("producao")}
        labelStyle={styles.menuText}
      />
      {openSubmenu === "producao" && (
        <View style={styles.submenu}>
          <DrawerItem
            label="Fazenda"
            onPress={() => {
              props.navigation.navigate("Producao", { screen: "Fazenda" });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
          <DrawerItem
            label="Produtos"
            onPress={() => {
              props.navigation.navigate("Producao", { screen: "Produtos" });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
          <DrawerItem
            label="Insumo"
            onPress={() => {
              props.navigation.navigate("Producao", { screen: "Insumo" });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
          <DrawerItem
            label="Produção"
            onPress={() => {
              props.navigation.navigate("Producao", { screen: "Producao" });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
          <DrawerItem
            label="Estoque de Produtos"
            onPress={() => {
              props.navigation.navigate("Producao", {
                screen: "EstoqueProduto",
              });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
          <DrawerItem
            label="Estoque de Insumos"
            onPress={() => {
              props.navigation.navigate("Producao", {
                screen: "EstoqueInsumo",
              });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
        </View>
      )}

      <DrawerItem
        label="Administração"
        onPress={() => toggleSubmenu("administracao")}
        labelStyle={styles.menuText}
      />
      {openSubmenu === "administracao" && (
        <View style={styles.submenu}>
          <DrawerItem
            label="Medidas"
            onPress={() => {
              props.navigation.navigate("Administracao", { screen: "Medidas" });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
          <DrawerItem
            label="Cadastro"
            onPress={() => {
              props.navigation.navigate("Administracao", {
                screen: "Cadastro",
              });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
          <DrawerItem
            label="Notificações"
            onPress={() => {
              props.navigation.navigate("Administracao", {
                screen: "Notifications",
              });
              setOpenSubmenu(null);
            }}
            labelStyle={styles.submenuText}
          />
        </View>
      )}

      {/* <DrawerItem
        label="Transações"
        onPress={() => {
          setOpenSubmenu(null);
          props.navigation.navigate("Transações");
        }}
        labelStyle={styles.menuText}
      /> */}

      <DrawerItem
        label="Sair"
        onPress={() => {
          setOpenSubmenu(null);
          props.navigation.navigate("Sair");
        }}
        labelStyle={[styles.menuText, { color: "red" }]}
      />
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
