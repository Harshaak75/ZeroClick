// // hooks/usePersistedLanguage.ts
// import { useEffect } from "react";
// import { Preferences } from "@capacitor/preferences";
// import i18n from "../i18n"; // Adjust the path

// export const usePersistedLanguage = () => {
//   useEffect(() => {
//     const loadLang = async () => {
//       const { value } = await Preferences.get({ key: "lang" });
//       if (value && i18n.language !== value) {
//         await i18n.changeLanguage(value);
//       }
//     };

//     loadLang();
//   }, []);
// };


import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import i18n from "../i18n"; // adjust if needed

export const usePersistedLanguage = () => {
  const [, setLoaded] = useState(false); // dummy state to trigger re-render

  useEffect(() => {
    const loadLang = async () => {
      const { value } = await Preferences.get({ key: "lang" });
      if (value && i18n.language !== value) {
        await i18n.changeLanguage(value);
      }
      setLoaded(true); // force re-render after language load
    };

    loadLang();
  }, []);
};

