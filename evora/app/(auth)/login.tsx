// app/(auth)/login.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { userService } from "@/lib/userService";

const InputField = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "sentences",
  secureTextEntry = false,
  icon,
  focusedInput,
  setFocusedInput,
  error,
  onSubmitEditing,
  returnKeyType = "next",
  inputRef,
}: any) => (
  <View className="mb-4">
    <View
      className={`flex-row items-center bg-white rounded-2xl px-5 py-4 shadow-sm border-2 ${
        error
          ? "border-red-400"
          : focusedInput === placeholder
          ? "border-[#C17B3C] shadow-md"
          : "border-[#E8DCC8]"
      }`}
    >
      {icon && <View className="mr-3">{icon}</View>}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor="#8B6F47"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onFocus={() => setFocusedInput(placeholder)}
        onBlur={() => setFocusedInput(null)}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        className="flex-1 text-[#2C1810] text-base font-medium"
      />
    </View>
    {error && (
      <Text className="text-red-500 text-xs mt-1 ml-2 font-medium">
        {error}
      </Text>
    )}
  </View>
);

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const passwordRef = React.useRef<TextInput>(null);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
  };

  const validateInputs = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const response = await userService.login({ email, password });
      const { user, token } = response.data;
      await AsyncStorage.setItem("token", JSON.stringify(token));
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/(tabs)/profile");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.response?.data?.error || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      email.trim() &&
      password &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center px-6 py-8">
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.push("/(tabs)")}
              className="absolute top-2 left-6 z-10 bg-[#F5EFE6] rounded-full p-3 shadow-md border border-[#D4C4B0]"
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-back" size={24} color="#2C1810" />
            </TouchableOpacity>
            {/* Header */}
            <View className="items-center mb-10">
              <View className="w-20 h-20 bg-[#F5EFE6] rounded-3xl items-center justify-center mb-4 shadow-lg border-2 border-[#D4C4B0] overflow-hidden">
                <Image
                  source={require("../../assets/images/icon.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-4xl font-black text-[#2C1810] mb-2 tracking-tight">
                Welcome Back
              </Text>
              <Text className="text-[#8B6F47] text-base">
                Sign in to continue your journey
              </Text>
            </View>

            {/* Form */}
            <View className="bg-[#F5EFE6] p-6 rounded-3xl shadow-2xl border-2 border-[#D4C4B0]">
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<MaterialIcons name="email" size={22} color="#8B6F47" />}
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                error={errors.email}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />

              <View className="mb-4">
                <View
                  className={`flex-row items-center bg-white rounded-2xl px-5 py-4 shadow-sm border-2 ${
                    errors.password
                      ? "border-red-400"
                      : focusedInput === "Password"
                      ? "border-[#C17B3C] shadow-md"
                      : "border-[#E8DCC8]"
                  }`}
                >
                  <MaterialIcons
                    name="lock"
                    size={22}
                    color="#8B6F47"
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    ref={passwordRef}
                    placeholder="Password"
                    placeholderTextColor="#8B6F47"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocusedInput("Password")}
                    onBlur={() => setFocusedInput(null)}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                    className="flex-1 text-[#2C1810] text-base font-medium"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2"
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                      size={22}
                      color="#8B6F47"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-xs mt-1 ml-2 font-medium">
                    {errors.password}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.8}
                disabled={loading || !isFormValid()}
                className={`mt-2 rounded-2xl py-4 items-center shadow-lg ${
                  loading || !isFormValid()
                    ? "bg-[#C17B3C]/50"
                    : "bg-[#C17B3C]"
                }`}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-black text-lg tracking-wide">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity className="mt-4 items-center">
                <Text className="text-[#8B6F47] text-sm font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <View className="mt-6 items-center">
                <Text className="text-[#8B6F47] text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/(auth)/signup"
                    className="text-[#C17B3C] font-bold"
                  >
                    Sign Up
                  </Link>
                </Text>
              </View>
            </View>

            <View className="mt-8 items-center">
              <View className="bg-[#F5EFE6] px-6 py-3 rounded-full shadow-md border border-[#D4C4B0]">
                <Text className="text-[#8B6F47] text-xs font-medium">
                  Secured with end-to-end encryption
                </Text>
              </View>
            </View>

            <View className="mt-4 items-center">
              <View className="bg-[#FFE4B5] px-4 py-2 rounded-full shadow-sm border border-[#F4D19B]">
                <Text className="text-[#8B6F47] text-xs font-semibold">
                  Test Mode: Use any credentials
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
