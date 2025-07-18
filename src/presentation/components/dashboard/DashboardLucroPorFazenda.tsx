import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLegend,
  VictoryTheme,
} from "victory-native";

export default function DashboardLucroPorFazenda() {
  const rawData = [
    { fazenda: "Fazenda Sao Joao", lucro: 50000, vendas: 120 },
    { fazenda: "Fazenda B", lucro: 30000, vendas: 90 },
    { fazenda: "Fazenda C", lucro: 45000, vendas: 100 },
    { fazenda: "Fazenda D", lucro: 25000, vendas: 70 },
    { fazenda: "Fazenda E", lucro: 60000, vendas: 150 },
  ];

  // Ordena pelo maior lucro
  const dados = [...rawData].sort((a, b) => b.lucro - a.lucro);
  const ticks = dados.map((_, i) => i + 1);
  const labels = dados.map((d) => d.fazenda);

  return (
    <View className="rounded-xl shadow-sm bg-gray-200 w-full">
      <Text className="text-lg font-semibold text-gray-700 p-4 pb-0">
        Fazendas com maior Lucro/Vendas (R$)
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          animate={{ duration: 600, easing: "quadInOut" }}
          height={300}
          padding={{ top: 70, bottom: 60, left: 55, right: 55 }}
        >
          <VictoryLegend
            x={10}
            y={10}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: "Lucro", symbol: { fill: "#059669" } },
              { name: "Vendas", symbol: { fill: "#2563eb" } },
            ]}
          />

          <VictoryAxis
            tickValues={ticks}
            tickFormat={labels}
            style={{
              tickLabels: {
                fill: "#1e293b",
                angle: -45,
                fontSize: 11,
                padding: 15,
              },
            }}
          />

          <VictoryAxis
            dependentAxis
            tickFormat={(t) => (t >= 1000 ? `${t / 1000}k` : t)}
          />

          <VictoryBar
            data={dados}
            x="fazenda"
            y="lucro"
            labels={({ datum }) => datum.vendas}
            style={{
              data: { fill: "#059669", width: 30 },
              labels: { fill: "#2563eb", fontWeight: "bold", fontSize: 13 },
            }}
          />
        </VictoryChart>
      </ScrollView>
    </View>
  );
}
