import { View, Text, Image, ImageBackground } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import Button from "@/presentation/components/ui/Button";
import Input from "@/presentation/components/ui/Input";
import { LoginFormErrors, LoginForm } from "@/presentation/models/LoginForm";
import { ShowToast } from "@/presentation/components/ui/Toast";
import { Loading } from "@/presentation/components/ui/Loading";

export default function Login() {
  const { login } = useAuth();
  const [values, setValues] = useState<LoginForm>(new LoginForm());
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loginRunning, setLoginRunning] = useState(false);

  function handleOnChange(field: string, value: any) {
    setValues(new LoginForm({ ...values, [field]: value }));
  }

  const onConfirm = async () => {
    if (!loginRunning) {
      Loading.show();
      setLoginRunning(true);

      const { isValid, errors } = values.validate();
      setErrors(errors);

      if (isValid) {
        try {
          const isAuthenticated = await login(values.email, values.password);
          if (isAuthenticated) {
            router.replace("/(protected)/Home");
          } else {
            ShowToast("error", "Credenciais incorretas.");
          }
        } catch (error) {
          if (error instanceof Error) {
            ShowToast(
              "error",
              error.message || "Erro desconhecido ao fazer login."
            );
          }
        }
      }
      setLoginRunning(false);
      Loading.hide();
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/fundo-login.webp")}
      resizeMode="cover"
      className="flex-1 px-10"
    >
      <View className="bg-white/70 rounded-2xl p-6 top-36">
        <Image
          source={require("@/assets/images/splash-icon.png")}
          className="w-72 h-16 self-center mb-6"
          resizeMode="contain"
        />

        <View className="gap-4">
          <Input
            type="email"
            value={values.email}
            placeholder="Email"
            error={errors.email}
            onValueChanged={(value) => handleOnChange("email", value)}
          ></Input>

          <Input
            className="pb-6"
            type="password"
            value={values.password}
            placeholder="Senha"
            error={errors.password}
            onValueChanged={(value) => handleOnChange("password", value)}
          ></Input>
        </View>

        <Button text="Acessar" onPress={onConfirm} />
      </View>
    </ImageBackground>
  );
}
