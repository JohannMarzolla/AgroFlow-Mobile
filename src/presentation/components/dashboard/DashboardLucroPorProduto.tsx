import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useAuth } from "@/presentation/contexts/AuthContext";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

export default function DashboardLucroPorProduto() {
  const { user } = useAuth();

  if (user?.setor === UsuarioSetorEnum.PRODUCAO) return;

  const vendasPorProduto = [
    { produto: "Soja", lucro: 15000 },
    { produto: "Milho", lucro: 15000 },
    { produto: "Trigo", lucro: 8000 },
    { produto: "Feijão", lucro: 4000 },
    { produto: "Feijão 2", lucro: 2000 },
  ];

  return (
    <View className="rounded-xl shadow-sm bg-gray-200 w-full">
      <Text className="text-lg font-semibold text-gray-700 p-4 pb-0">
        Produtos com maior lucro
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 30 }}
          height={250}
          padding={{ top: 40, bottom: 45, left: 50, right: 30 }}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${(x / 1000).toFixed(0)}k`}
            style={{
              tickLabels: { fontSize: 13 },
            }}
          />

          <VictoryAxis
            tickFormat={vendasPorProduto.map((p) => p.produto)}
            style={{
              tickLabels: {
                fontSize: 12,
                fill: "#1e293b",
                angle: -30,
                padding: 12,
              },
            }}
          />

          <VictoryBar
            data={vendasPorProduto}
            x="produto"
            y="lucro"
            labels={({ datum }) => `${(datum.lucro / 1000).toFixed(1)}k`}
            style={{
              data: { fill: "#2563eb", width: 30 },
              labels: { fill: "#1e293b", fontSize: 13 },
            }}
          />
        </VictoryChart>
      </ScrollView>
    </View>
  );
}
