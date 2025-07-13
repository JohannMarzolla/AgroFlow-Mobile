import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useAuth } from "@/presentation/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";
import { DashboardService } from "@/application/services/outros/DashboardService";
import { DashboardApiService } from "@/infrastructure/services/outros/DashboardApiService";
import { ProducaoStatusEnum } from "@/domain/enum/producao/producao.enum";
import ProducaoConsts from "@/shared/constants/producao.consts";

interface DashboardData {
  status: ProducaoStatusEnum;
  statusText: string;
  qtd: number;
}

export default function DashboardProducaoPorStatus() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData[]>([]);
  const dashboardService = new DashboardService(new DashboardApiService());

  if (user?.setor === UsuarioSetorEnum.COMERCIAL) return;

  const colorsMap: Record<ProducaoStatusEnum, string> = {
    AGUARDANDO: "#f59e0b",
    EM_PRODUCAO: "#2563eb",
    COLHIDA: "#059669",
  };

  const buscarDados = async () => {
    const dados = await dashboardService.buscarProducaoPorStatus();

    setData(
      dados?.map((apiResult) => {
        return {
          statusText: ProducaoConsts.statusText[apiResult.status],
          status: apiResult.status,
          qtd: apiResult.qtd,
        } as DashboardData;
      })
    );
  };

  useEffect(() => {
    buscarDados();

    const unsub = dashboardService.escutarProducaoPorStatus(() =>
      buscarDados()
    );

    return () => unsub();
  }, []);

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
          x="status"
          y="qtd"
          labels={({ datum }) => datum.qtd}
          style={{
            data: {
              width: 40,
              fill: ({ datum }) =>
                colorsMap[datum.status as ProducaoStatusEnum],
            },
            labels: { fill: "#1e293b", fontSize: 14 },
          }}
        />
      </VictoryChart>
    </View>
  );
}
