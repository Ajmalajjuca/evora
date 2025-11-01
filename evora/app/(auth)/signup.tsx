import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { validateSignup } from "../../lib/validations/signupValidation";
import { userService } from "../../lib/userService";

const { width } = Dimensions.get("window");

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

export default function SignupScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Refs for managing input focus
  const emailRef = React.useRef<TextInput>(null);
  const phoneRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  const validateField = (key: string, value: string) => {
    let error = "";
    switch (key) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2) error = "Name is too short";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value.replace(/\D/g, "")))
          error = "Phone must be 10 digits";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
    }
    return error;
  };

  const handleSignup = async () => {
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key as keyof typeof form]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const error = validateSignup(form);
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    setLoading(true);
    try {
      const response = await userService.signup(form);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("token", response.data.token);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/(tabs)/profile");
    } catch (error: any) {
      Alert.alert(
        "Signup Failed",
        error?.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.password &&
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
            <TouchableOpacity
                          onPress={() => router.push("/(tabs)")}
                          className="absolute top-2 left-6 z-10 bg-[#F5EFE6] rounded-full p-3 shadow-md border border-[#D4C4B0]"
                          activeOpacity={0.7}
                        >
                          <MaterialIcons name="arrow-back" size={24} color="#2C1810" />
                        </TouchableOpacity>
            <View className="items-center mb-10">
              <View className="w-20 h-20 bg-[#F5EFE6] rounded-3xl items-center justify-center mb-4 shadow-lg border-2 border-[#D4C4B0] overflow-hidden">
                <Image
                  source={require("../../assets/images/icon.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-4xl font-black text-[#2C1810] mb-2 tracking-tight">
                Create Account
              </Text>
              <Text className="text-[#8B6F47] text-base">
                Join us and start exploring events
              </Text>
            </View>

            <View className="bg-[#F5EFE6] p-6 rounded-3xl shadow-2xl border-2 border-[#D4C4B0]">
              <InputField
                placeholder="Full Name"
                value={form.name}
                onChangeText={(text: string) => handleChange("name", text)}
                icon={<MaterialIcons name="person" size={22} color="#8B6F47" />}
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                error={errors.name}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              <InputField
                inputRef={emailRef}
                placeholder="Email"
                value={form.email}
                onChangeText={(text: string) => handleChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<MaterialIcons name="email" size={22} color="#8B6F47" />}
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                error={errors.email}
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
              <InputField
                inputRef={phoneRef}
                placeholder="Phone Number"
                value={form.phone}
                onChangeText={(text: string) => handleChange("phone", text)}
                keyboardType="phone-pad"
                icon={<MaterialIcons name="phone" size={22} color="#8B6F47" />}
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                error={errors.phone}
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
                    value={form.password}
                    onChangeText={(text: string) => handleChange("password", text)}
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocusedInput("Password")}
                    onBlur={() => setFocusedInput(null)}
                    returnKeyType="done"
                    onSubmitEditing={handleSignup}
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
                onPress={handleSignup}
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
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              <View className="flex-row justify-center items-center mt-6">
                <Text className="text-[#8B6F47] text-sm">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="text-[#C17B3C] font-bold text-sm">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
