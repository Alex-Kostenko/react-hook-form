import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import "./App.css";
import { TextInput } from "./components/textInput";
import { RangeInput } from "./components/rangeInput";
import { PassWordInput } from "./components/passwordInput";
import { NumberInput } from "./components/numberInput";
import { ImageInput } from "./components/imageInput";
import { EmailInput } from "./components/emailInput";
import { DateInput } from "./components/dateInput";
import { CheckBoxInput } from "./components/checkBoxinput";
import { useEffect, useState } from "react";
import { CustomSelect } from "./components/customSelect";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { loginUri } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

type Inputs = {
  textName: string;
  rangeInput: string;
  password: string;
  numberInput: string;
  emailInput: string;
  dateInput: string;
  checkbox: boolean;
  country: Icountry;
};

function App() {
  const methods = useForm<Inputs>({
    mode: "all",
  });

  const { register, handleSubmit, reset, watch, setValue, control } = methods;
  const [userr, setUser] = useState<any>({});
  const [installToken, setInstallToken] = useState<string>("");

  const [spotifyUser, setSpotifyUser] = useState<any>();

  const spotifyParser = new SpotifyWebApi();

  useEffect(() => {
    spotifyParser.setAccessToken(
      "BQAgQOcWPYmd6vXXJdhd3UpUYx3ti619Y_nxkGijiI4b4MIymh0wpNJx1cgZfB4tgFpsOB0DJD7Uv2AbVjF58LbX58MUnx1sGS8G1i9ZaTPbVXR5Kd67XAQxiPaQWbH3ALMQtl4UQfkIBZbhB_m7U1MwacdCPQ3yXej0yc9JrhkCihYO6n630emWJqxV2sBA5a0MXGPvtip354QLxL9RyRg&token_type=Bearer&expires_in=3600"
    );
    spotifyParser.getMe().then((user) => {
      console.log("USER СПОТІФАЯ", user);
      setSpotifyUser(user);

      (async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/auth/spotify-sign-in`,
            {
              method: "POST",
              credentials: "include",
              mode: "no-cors",
              body: JSON.stringify(user),
            }
          );
          if (!response.ok) {
            console.error("Помилка при запиті", response);
            return;
          }

          const data = await response.json();
          console.log("Дані з бекенда:", data);
        } catch (error) {
          console.error("ошибка:", error);
        }
      })();
    });
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<Inputs> = () => {
    reset();
  };

  const loginSpotik = (): any =>
    fetch(`http://localhost:3000/auth/loginSpotik`, {
      method: "GET",
      credentials: "include",
      mode: "no-cors",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

  const login = (token: string): any =>
    fetch(`http://localhost:3000/auth/google-sign-in?userTokenId=${token}`, {
      method: "POST",
      credentials: "include",
      mode: "no-cors",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

  const onGoogleLoginSuccess = async ({ credential }: CredentialResponse) => {
    if (credential) {
      console.log("credential", credential);
      const { access_token, user } = await login(credential);
      if (access_token && user) {
        setUser(user);
        setInstallToken(access_token);

        console.log("user присутній", userr);
        console.log("token присутній", installToken);
      }
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={
        "818240597825-aq06j45tfc5ii3fn7ihga66indkuukjp.apps.googleusercontent.com"
      }
    >
      <div className="App">
        REACT Hook FORM
        <GoogleLogin
          onSuccess={(credentialResponse) =>
            onGoogleLoginSuccess(credentialResponse)
          }
          onError={() => {
            console.log("Login Failed");
          }}
        />
        {/* <button onClick={() => loginSpotik()}> WITH loginSpotik</button> */}
        <a href={loginUri}>Sign in with Spotik</a>
        <FormProvider {...methods}>
          <form className="wrapperForm" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              rules={{
                ...register("textName", {
                  required: "Text Name is required!",
                  minLength: { value: 5, message: "Не менше 5 символів" },
                }),
              }}
            />

            <RangeInput
              rules={{
                ...register("rangeInput"),
              }}
            />
            <PassWordInput
              rules={{
                ...register("password", {
                  required: "Password Input is required",
                  minLength: { value: 5, message: "Не менше 5 символів" },
                }),
              }}
            />
            <NumberInput
              rules={{
                ...register("numberInput", {
                  required: "Number Input is required",
                  minLength: { value: 3, message: "Не менше 3 символів" },
                }),
              }}
            />

            <EmailInput
              rules={{
                ...register("emailInput", {
                  required: "Email Input is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email is not valid",
                  },
                }),
              }}
            />
            <DateInput
              rules={{
                ...register("dateInput"),
              }}
            />
            <CheckBoxInput
              rules={{
                ...register("checkbox"),
              }}
            />
            <Controller
              control={control}
              name="country"
              rules={{ required: "Select is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CustomSelect
                  onChangeFunc={onChange}
                  valueSelect={value}
                  errorSelect={error}
                />
              )}
            />
            <ImageInput />
          </form>
          <button onClick={() => setValue("textName", "testik")}>
            New value in form
          </button>
        </FormProvider>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
