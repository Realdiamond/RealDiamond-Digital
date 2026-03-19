"use client";

import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    let loaded = false;
    let idleId: number | undefined;
    let delayId: ReturnType<typeof setTimeout> | undefined;

    const loadWidget = () => {
      if (loaded) {
        return;
      }
      loaded = true;

      const Tawk_API: any = (window as any).Tawk_API || {};
      const Tawk_LoadStart = new Date();

      Tawk_API.customStyle = {
        visibility: {
          desktop: {
            position: "br",
            xOffset: 24,
            yOffset: 89,
          },
          mobile: {
            position: "br",
            xOffset: 24,
            yOffset: 89,
          },
        },
      };

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/698f2024cf39cf1c38c19a54/1jhbhb4gj";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      script.setAttribute("data-tawk-script", "true");

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }

      (window as any).Tawk_API = Tawk_API;
      (window as any).Tawk_LoadStart = Tawk_LoadStart;

      const style = document.createElement("style");
      style.setAttribute("data-tawk-custom", "true");
      style.innerHTML = `
        #tawk-bubble-container,
        .tawk-bubble-container {
          bottom: 89px !important;
          right: 24px !important;
        }
        #tawk-chat-container,
        .tawk-chat-container {
          bottom: 89px !important;
          right: 24px !important;
        }
      `;
      document.head.appendChild(style);
      removeInteractionListeners();
    };

    const interactionEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    const handleFirstInteraction = () => {
      loadWidget();
    };

    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleFirstInteraction);
      });
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleFirstInteraction, {
        passive: true,
        once: true,
      });
    });

    if ("requestIdleCallback" in window) {
      idleId = (window as Window & typeof globalThis).requestIdleCallback(() => {
        delayId = setTimeout(loadWidget, 4000);
      });
    } else {
      delayId = setTimeout(loadWidget, 6000);
    }

    return () => {
      removeInteractionListeners();

      if (idleId !== undefined && "cancelIdleCallback" in window) {
        (window as Window & typeof globalThis).cancelIdleCallback(idleId);
      }
      if (delayId !== undefined) {
        clearTimeout(delayId);
      }

      const tawkScript = document.querySelector('script[data-tawk-script="true"]');
      if (tawkScript) {
        tawkScript.remove();
      }

      const tawkWidget = document.getElementById("tawk-widget-container");
      if (tawkWidget) {
        tawkWidget.remove();
      }

      const customStyle = document.querySelector('style[data-tawk-custom]');
      if (customStyle) {
        customStyle.remove();
      }
    };
  }, []);

  return null; // Tawk.to widget is injected via script
};

export default TawkToChat;
