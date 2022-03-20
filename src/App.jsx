import { useCallback, useEffect, useState } from "react";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  TextField,
  ColorPicker,
  hsbToRgb,
  rgbString
} from "@shopify/polaris";
import "./index.css";

function hslToRgb(color) {
  const value = rgbString(hsbToRgb(color))
  return value;
}

export default function App() {
  const [value, setValue] = useState("your quote");

  const [style, setStyle] = useState({
    width: "700px",
    height: "300px",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: ""
  });

  const [color, setColor] = useState({
    hue: 255,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7
  });

  useEffect(() => {
    setStyle({
      ...style,
      color: hslToRgb(color)
    });
  }, [color,style]);

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <AppProvider i18n={enTranslations}>
      <TextField
        label="Your Quote"
        value={value}
        onChange={handleChange}
        autoComplete="off"
        maxLength={100}
      />
      <ColorPicker onChange={setColor} color={color} allowAlpha={true} />

      <div style={style} className="App">
        {value}
      </div>
    </AppProvider>
  );
}
