import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useAuth } from "@/presentation/contexts/AuthContext";
import React from "react";
import { Text, View } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

export default function DashboardProducaoPorStatus() {
  const { user } = useAuth();

  if (user?.setor === UsuarioSetorEnum.COMERCIAL) return;

  const statusCounts = {
    aguardando: 8,
    emProducao: 12,
    colhido: 5,
  };

  const data = [
    { ID: 1, status: "Aguardando", qtd: statusCounts.aguardando },
    { ID: 2, status: "Em produção", qtd: statusCounts.emProducao },
    { ID: 3, status: "Colhido", qtd: statusCounts.colhido },
  ];

  const colorsMap: Record<number, string> = {
    1: "#f59e0b",
    2: "#2563eb",
    3: "#059669",
  };

  return (
    <View className="rounded-xl shadow-sm bg-gray-200 w-full">
      <Text className="text-lg font-semibold text-gray-700 p-4 pb-0">
        Produções por status
      </Text>

      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 50 }}
        height={250}
        padding={{ top: 40, bottom: 40, left: 20, right: 55 }}
      >
        <VictoryAxis
          tickValues={[1, 2, 3]}
          tickFormat={["Aguardando", "Em produção", "Colhido"]}
          style={{
            tickLabels: { fontSize: 14, fill: "#1e293b" },
          }}
        />

        <VictoryBar
          data={data}
          x="ID"
          y="qtd"
          labels={({ datum }) => datum.qtd}
          style={{
            data: { width: 40, fill: ({ datum }) => colorsMap[datum.ID] },
            labels: { fill: "#1e293b", fontSize: 14 },
          }}
        />
      </VictoryChart>
    </View>
  );
}
