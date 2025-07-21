import { DashboardService } from "@/application/services/outros/DashboardService";
import { DashboardApiService } from "@/infrastructure/services/outros/DashboardApiService";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { VictoryPie } from "victory-native";

interface DashboardData {
  x: string;
  y: number;
  color: string;
}

export default function DashboardProduzidoXPerdas() {
  const [data, setData] = useState<DashboardData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const dashboardService = new DashboardService(new DashboardApiService());

  const buscarDados = async () => {
    const dados = await dashboardService.buscarProducaoProduzidoVsPerdas();
    setData([
      { color: "#059669", x: "Produzido", y: dados.produzido },
      { color: "#ef4444", x: "Perdas", y: dados.perdas },
    ]);
    setTotal(dados.produzido + dados.perdas);
  };

  useEffect(() => {
    buscarDados();

    const unsub = dashboardService.escutarProducaoProduzidoVsPerdas(() =>
      buscarDados()
    );

    return () => unsub();
  }, []);

  return (
    <View className="rounded-xl shadow-sm bg-gray-200 w-full">
      <Text className="text-lg font-semibold text-gray-700 p-4 pb-0">
        Produzido x Perdas
      </Text>

      {total === 0 ? (
        <Text className="text-agroflow-gray text-center py-6 h-52">
          Não há dados
        </Text>
      ) : (
        <VictoryPie
          data={data}
          colorScale={data.map((item) => item.color)}
          labels={({ datum }) => {
            const porcentagem =
              total > 0 ? ((datum.y / total) * 100).toFixed(1) : 100;
            return `${datum.x}\n ${porcentagem}%`;
          }}
          style={{
            labels: { fontSize: 14, fill: "#1e293b", fontWeight: "bold" },
          }}
          height={380}
          padding={{ top: 60, bottom: 60, left: 20, right: 55 }}
        />
      )}
    </View>
  );
}
