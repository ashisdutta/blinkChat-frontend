import { useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: Number(position.coords.latitude),
          lng: Number(position.coords.longitude),
        });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        // Handle specific error codes
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(
              "Permission denied. Please allow location access in your browser settings."
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setError(
              "Location unavailable. Please ensure your device's location/GPS is turned on."
            );
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An unknown error occurred getting location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return { location, error, loading, getLocation };
}
