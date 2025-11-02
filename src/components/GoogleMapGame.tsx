import { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Data } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GoogleMapGameProps {
  currentCountry: {
    name: string;
    flag: string;
    capital: string;
  };
  onCountryClick: (countryName: string) => void;
  isCorrect: boolean | null;
  apiKey: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 54,
  lng: 15,
};

// Mapowanie polskich nazw na kody ISO krajów
const countryCodeMap: { [key: string]: string } = {
  "Polska": "PL",
  "Niemcy": "DE",
  "Francja": "FR",
  "Hiszpania": "ES",
  "Włochy": "IT",
  "Wielka Brytania": "GB",
  "Szwecja": "SE",
  "Norwegia": "NO",
  "Grecja": "GR",
  "Portugalia": "PT",
  "Holandia": "NL",
  "Belgia": "BE",
  "Austria": "AT",
  "Czechy": "CZ",
  "Dania": "DK",
};

const GoogleMapGame = ({ currentCountry, onCountryClick, isCorrect, apiKey }: GoogleMapGameProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [clickedFeature, setClickedFeature] = useState<google.maps.Data.Feature | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);

    // Załaduj granice krajów europejskich
    map.data.loadGeoJson(
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
    );

    // Ustaw style dla krajów
    map.data.setStyle((feature) => {
      const isSelected = feature === clickedFeature;
      const countryCode = feature.getProperty("ISO_A2");
      const targetCountryCode = countryCodeMap[currentCountry.name];

      let fillColor = "#cbd5e1"; // default gray
      
      if (isCorrect !== null && countryCode === targetCountryCode) {
        fillColor = "#10b981"; // green for correct
      } else if (isSelected && isCorrect === false) {
        fillColor = "#ef4444"; // red for wrong
      } else if (isSelected && isCorrect === null) {
        fillColor = "#3b82f6"; // blue for selected
      }

      return {
        fillColor: fillColor,
        fillOpacity: 0.7,
        strokeColor: "#64748b",
        strokeWeight: 1,
        cursor: isCorrect === null ? "pointer" : "default",
      };
    });

    // Dodaj event listener dla kliknięć
    map.data.addListener("click", (event: google.maps.Data.MouseEvent) => {
      if (isCorrect !== null) return; // Nie pozwalaj na kliknięcia po odpowiedzi

      const feature = event.feature;
      setClickedFeature(feature);
      
      const countryName = feature.getProperty("ADMIN") || feature.getProperty("name");
      const countryCode = feature.getProperty("ISO_A2");
      
      // Znajdź polską nazwę kraju na podstawie kodu
      const polishName = Object.keys(countryCodeMap).find(
        key => countryCodeMap[key] === countryCode
      );
      
      if (polishName) {
        onCountryClick(polishName);
      }
    });

    // Dodaj hover effect
    map.data.addListener("mouseover", (event: google.maps.Data.MouseEvent) => {
      if (isCorrect === null) {
        map.data.overrideStyle(event.feature, { fillOpacity: 0.9 });
      }
    });

    map.data.addListener("mouseout", (event: google.maps.Data.MouseEvent) => {
      map.data.revertStyle();
    });
  }, [currentCountry, clickedFeature, isCorrect]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] bg-muted/30 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Ładowanie mapy...</p>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 rounded-lg overflow-hidden border-2 border-border">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "greedy",
          minZoom: 3,
          maxZoom: 6,
        }}
      />
    </div>
  );
};

export default GoogleMapGame;
