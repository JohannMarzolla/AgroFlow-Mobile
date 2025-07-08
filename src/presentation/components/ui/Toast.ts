import { colors } from "@/shared/constants/colors";
import Toast from "react-native-toast-message";

export function ShowToast(
  type: "success" | "info" | "error",
  message: string,
  detail?: string
) {
  Toast.show({
    type: type ?? "success",
    text1: message,
    text1Style: {
      fontSize: 14,
      flexWrap: "wrap",
      flexShrink: 1,
    },
    text2: detail,
    text2Style: {
      fontSize: 13,
      color: colors.agroflow.gray,
      flexWrap: "wrap",
      flexShrink: 1,
    },
    position: "bottom",
    visibilityTime: 5000,
  });
}
