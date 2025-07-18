import React from "react";
import { ScrollView, Text, View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";

export default function DashboardLucroPorMes() {
  const lucroPorMes = [
    { mes: "Jan", lucro: 320000 },
    { mes: "Fev", lucro: 410000 },
    { mes: "Mar", lucro: 380000 },
    { mes: "Abr", lucro: 290000 },
    { mes: "Mai", lucro: 450000 },
    { mes: "Jun", lucro: 520000 },
    { mes: "Jul", lucro: 610000 },
    { mes: "Ago", lucro: 480000 },
    { mes: "Set", lucro: 390000 },
    { mes: "Out", lucro: 430000 },
    { mes: "Nov", lucro: 470000 },
    { mes: "Dez", lucro: 500000 },
  ];

  const chartWidth = lucroPorMes.length * 60; // 60px por barra

  return (
    <View className="rounded-xl shadow-sm bg-gray-200 w-full">
      <Text className="text-lg font-semibold text-gray-700 p-4 pb-0">
        Lucro por mês (R$)
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 30 }}
          width={chartWidth}
          height={300}
          padding={{ top: 20, bottom: 45, left: 55, right: 30 }}
        >
          <VictoryAxis
            tickValues={lucroPorMes.map((_, i) => i + 1)}
            tickFormat={lucroPorMes.map((d) => d.mes)}
            style={{
              tickLabels: {
                fill: "#1e293b",
                fontSize: 11,
                angle: -30,
                padding: 12,
              },
            }}
          />

          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${(x / 1000).toFixed(0)}k`}
            style={{
              tickLabels: { fontSize: 12 },
            }}
          />

          <VictoryBar
            data={lucroPorMes}
            x="mes"
            y="lucro"
            labels={({ datum }) => `${(datum.lucro / 1000).toFixed(1)}k`}
            style={{
              data: { fill: "#059669", width: 30 },
              labels: { fill: "#1e293b", fontSize: 12 },
            }}
          />
        </VictoryChart>
      </ScrollView>
    </View>
  );
}
