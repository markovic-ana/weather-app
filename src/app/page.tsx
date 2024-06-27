"use client";

import { AnimatePresence, motion, useWillChange } from "framer-motion";
import { Fragment, useState } from "react";
import { css } from "styled-components";
import { Button } from "@/components/Button/Button";
import { THEME } from "@/theme/theme";
import { TextInput } from "@/components/Inputs/TextInput/TextInput";
import { Text } from "@/components/Text";
import axios from "axios";
import { capitilizeFirstLetter } from "@/utils/stringTransform";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function Home() {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === 1) {
        handleSubmit(e);
      } else if (step === 2) {
        setStep(step - 1);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      setWeather(response.data);
      setStep(step + 1);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("City not found, please try again");
      console.error("Error fetching the weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const willChange = useWillChange();

  return (
    <div
      css={css`
        background-size: cover;
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${THEME.palette.black};
      `}
    >
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          style={{ willChange }}
          transition={{
            opacity: { duration: 0.4 },
            x: {
              type: "spring",
              stiffness: 500,
              damping: 50,
            },
          }}
          key={step}
          css={css`
            display: flex;
            flex-direction: column;
            padding: 20px;
            gap: 32px;
            width: 400px;
            min-height: 410px;
            background-color: black;
            border: 1px solid ${THEME.palette.accent};
            border-radius: ${THEME.borderRadius.lg};
            justify-content: space-between;
            position: relative;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <Fragment>
                  <TextInput
                    value={city}
                    onValueChange={setCity}
                    placeholder="Enter a city..."
                    inputStyles={css`
                      padding: 16px 8px;
                      padding-right: 12px;
                      min-height: unset;
                      min-width: 200px;
                      background: transparent;
                      max-width: 90%;
                      font-size: 16px;
                      border: none;
                      border-radius: 0;
                      border-bottom: 2px solid ${THEME.palette.accent};
                      font-weight: 400;
                      color: ${THEME.palette.white};
                    `}
                    onKeyDown={handleKeyDown}
                  />
                  {errorMessage && (
                    <AnimatePresence mode="popLayout">
                      <ErrorMessage
                        styles={css`
                          color: red;
                          bottom: 8px;
                          opacity: 0.3;
                        `}
                      >
                        {errorMessage}
                      </ErrorMessage>
                    </AnimatePresence>
                  )}
                </Fragment>
              )}
              {step === 2 && (
                <Text
                  fs={36}
                  fw={700}
                  color={THEME.palette.accent}
                  styles={css`
                    margin-bottom: 0;
                  `}
                >
                  It&apos;s{" "}
                  <span
                    css={css`
                      color: ${THEME.palette.white};
                    `}
                  >
                    {weather.main?.temp}°
                  </span>{" "}
                  in{" "}
                  <span
                    css={css`
                      color: ${THEME.palette.white};
                    `}
                  >
                    {capitilizeFirstLetter(city)}
                  </span>
                  . feels like{" "}
                  <span
                    css={css`
                      color: ${THEME.palette.white};
                    `}
                  >
                    {weather.main?.feels_like}°
                  </span>
                  . Expect{" "}
                  <span
                    css={css`
                      color: #caca98;
                    `}
                  >
                    {weather.weather?.[0]?.description}
                  </span>{" "}
                  today
                </Text>
              )}
            </form>
            <div
              css={css`
                display: flex;
                gap: 12px;
                justify-content: center;
                position: absolute;
                bottom: 36px;
              `}
            >
              {[1, 2].map((i, index) => (
                <div
                  key={index}
                  css={
                    step === i
                      ? css`
                          height: 8px;
                          width: 8px;
                          border-radius: 50%;
                          background-color: ${THEME.palette.white};
                        `
                      : css`
                          height: 8px;
                          width: 8px;
                          border-radius: 50%;
                          background-color: ${THEME.palette.accent};
                        `
                  }
                ></div>
              ))}
            </div>
          </div>
          <div
            css={css`
              align-self: flex-end;
            `}
          >
            {step == 2 ? (
              <Button
                styleType="primary"
                sizeType="md"
                styles={css`
                  width: 100%;
                  color: white;
                  border: 1px solid ${THEME.palette.white};
                `}
                onClick={() => {
                  setCity("");
                  setStep(step - 1);
                }}
              >
                NEW
              </Button>
            ) : (
              city.length > 2 && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Button
                    isDisabled={city.length < 2}
                    styleType="primary"
                    sizeType="md"
                    onClick={(e) => handleSubmit(e)}
                    styles={css`
                      width: 100%;
                      color: white;
                      border: 1px solid ${THEME.palette.white};
                    `}
                    isLoading={loading}
                  >
                    Next
                  </Button>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
