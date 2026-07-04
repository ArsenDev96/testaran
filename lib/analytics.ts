type AnalyticsEventParams = {
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: AnalyticsEventParams,
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: AnalyticsEventParams,
) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, params);
}