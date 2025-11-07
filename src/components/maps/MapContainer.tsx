"use client";

import { useEffect, useRef, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { TravelMode, Route } from "@/types/map";
import { findNearestRoad, generateCurvedPath } from "@/lib/map-utils";
import { ROUTE_COLORS, ROUTE_LINE_WIDTHS } from "@/lib/constants";

interface MapContainerProps {
  origin: [number, number] | null;
  destination: [number, number] | null;
  routes: Route[];
  activeRouteIndex: number;
  travelMode: TravelMode;
  isTilted: boolean;
  onOriginChange?: (coords: [number, number]) => void;
  onDestinationChange?: (coords: [number, number]) => void;
}

export function MapContainer({
  origin,
  destination,
  routes,
  activeRouteIndex,
  travelMode,
  isTilted,
  onOriginChange,
  onDestinationChange
}: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const originMarkerRef = useRef<maplibregl.Marker | null>(null);
  const destinationMarkerRef = useRef<maplibregl.Marker | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);

  // Draw connection to road
  const drawConnection = useCallback(
    (
      fromCoords: [number, number],
      toCoords: [number, number],
      type: "origin" | "destination"
    ) => {
      if (!mapRef.current || !mapRef.current.loaded()) return;

      const map = mapRef.current;
      const sourceId = `connection-${type}`;
      const lineLayerId = `connection-${type}-line`;
      const dotsLayerId = `connection-${type}-dots`;

      // Check distance
      const distance = Math.sqrt(
        Math.pow(fromCoords[0] - toCoords[0], 2) +
          Math.pow(fromCoords[1] - toCoords[1], 2)
      );

      if (distance < 0.0001) return;

      // Generate curved path
      const curvedPath = generateCurvedPath(fromCoords, toCoords, 30);

      // Update or create source
      if (map.getSource(sourceId)) {
        (map.getSource(sourceId) as maplibregl.GeoJSONSource).setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: curvedPath
              }
            }
          ]
        });
      } else {
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: curvedPath
                }
              }
            ]
          }
        });

        map.addLayer({
          id: lineLayerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-cap": "round",
            "line-join": "round"
          },
          paint: {
            "line-color": "#9e9e9e",
            "line-width": 3,
            "line-opacity": 0.6,
            "line-dasharray": [2, 2]
          }
        });

        // Add dots
        const numDots = 5;
        const dots: [number, number][] = [];
        for (let i = 1; i < numDots; i++) {
          const t = i / numDots;
          const index = Math.floor(t * (curvedPath.length - 1));
          dots.push(curvedPath[index]);
        }

        map.addSource(`${sourceId}-dots`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: dots.map((coord) => ({
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: coord
              }
            }))
          }
        });

        map.addLayer({
          id: dotsLayerId,
          type: "circle",
          source: `${sourceId}-dots`,
          paint: {
            "circle-radius": 4,
            "circle-color": "#9e9e9e",
            "circle-opacity": 0.8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff"
          }
        });
      }
    },
    []
  );

  // Initialize map (only once)
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        process.env.NEXT_PUBLIC_MAP_STYLE_URL ||
        "http://localhost:8080/styles/osm-bright/style.json",
      center: [0, 20], // World view center
      zoom: 2, // World zoom level
      pitch: 0
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // Empty deps - only initialize once

  // Handle map clicks with popup
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleClick = (e: maplibregl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat;

      // Remove existing popup if any
      if (popupRef.current) {
        popupRef.current.remove();
      }

      // Create popup HTML based on current state
      let popupHTML = "";

      if (!origin) {
        popupHTML = `
          <div class="text-xs">
            <button 
              id="set-origin" 
              class="w-full px-3 py-2 text-left hover:bg-blue-50 rounded-md transition-colors font-medium text-blue-600 flex items-center gap-2"
            >
              <span class="text-blue-600">📍</span> Set as starting point
            </button>
          </div>
        `;
      } else if (!destination) {
        popupHTML = `
          <div class="text-xs space-y-1">
            <button 
              id="set-destination" 
              class="w-full px-3 py-2 text-left hover:bg-blue-50 rounded-md transition-colors font-medium text-blue-600 flex items-center gap-2"
            >
              <span class="text-red-600">📍</span> Directions to here
            </button>
            <button 
              id="change-origin" 
              class="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors text-gray-700 flex items-center gap-2"
            >
              <span>↻</span> Change to starting point
            </button>
          </div>
        `;
      } else {
        popupHTML = `
          <div class="text-xs space-y-1">
            <button 
              id="change-destination" 
              class="w-full px-3 py-2 text-left hover:bg-blue-50 rounded-md transition-colors font-medium text-blue-600 flex items-center gap-2"
            >
              <span class="text-red-600">📍</span> Change destination
            </button>
            <button 
              id="change-origin" 
              class="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors text-gray-700 flex items-center gap-2"
            >
              <span>↻</span> Change to starting point
            </button>
          </div>
        `;
      }

      // Create and show popup
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: true,
        maxWidth: "200px",
        className: "map-action-popup"
      })
        .setLngLat([lng, lat])
        .setHTML(popupHTML)
        .addTo(map);

      popupRef.current = popup;

      // Add event listeners after popup is added to DOM
      setTimeout(() => {
        const setOriginBtn = document.getElementById("set-origin");
        const setDestinationBtn = document.getElementById("set-destination");
        const changeOriginBtn = document.getElementById("change-origin");
        const changeDestinationBtn =
          document.getElementById("change-destination");

        if (setOriginBtn && onOriginChange) {
          setOriginBtn.onclick = () => {
            onOriginChange([lng, lat]);
            popup.remove();
          };
        }

        if (setDestinationBtn && onDestinationChange) {
          setDestinationBtn.onclick = () => {
            onDestinationChange([lng, lat]);
            popup.remove();
          };
        }

        if (changeOriginBtn && onOriginChange) {
          changeOriginBtn.onclick = () => {
            onOriginChange([lng, lat]);
            popup.remove();
          };
        }

        if (changeDestinationBtn && onDestinationChange) {
          changeDestinationBtn.onclick = () => {
            onDestinationChange([lng, lat]);
            popup.remove();
          };
        }
      }, 0);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, [origin, destination, onOriginChange, onDestinationChange]);

  // Handle tilt changes
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.easeTo({
      pitch: isTilted ? 60 : 0,
      duration: 1000
    });
  }, [isTilted]);

  // Update origin marker
  useEffect(() => {
    if (!mapRef.current || !origin) return;

    const updateOrigin = async () => {
      // Remove existing marker
      if (originMarkerRef.current) {
        originMarkerRef.current.remove();
      }

      // Create new draggable marker
      const marker = new maplibregl.Marker({
        color: "#1a73e8",
        draggable: true
      })
        .setLngLat(origin)
        .addTo(mapRef.current!);

      originMarkerRef.current = marker;

      // Zoom to origin if coming from world view
      if (mapRef.current!.getZoom() < 10) {
        mapRef.current!.flyTo({
          center: origin,
          zoom: 13,
          duration: 1500
        });
      }

      // Find nearest road and draw connection
      const snappedPoint = await findNearestRoad(origin, travelMode);
      if (snappedPoint && destination) {
        drawConnection(origin, snappedPoint, "origin");
      }

      // Handle drag
      marker.on("dragend", async () => {
        const lngLat = marker.getLngLat();
        const coords: [number, number] = [lngLat.lng, lngLat.lat];
        onOriginChange?.(coords);
      });
    };

    updateOrigin();
  }, [origin, travelMode, destination, onOriginChange, drawConnection]);

  // Update destination marker
  useEffect(() => {
    if (!mapRef.current || !destination) return;

    const updateDestination = async () => {
      // Remove existing marker
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.remove();
      }

      // Create new draggable marker
      const marker = new maplibregl.Marker({
        color: "#d93025",
        draggable: true
      })
        .setLngLat(destination)
        .addTo(mapRef.current!);

      destinationMarkerRef.current = marker;

      // Find nearest road and draw connection
      const snappedPoint = await findNearestRoad(destination, travelMode);
      if (snappedPoint && origin) {
        drawConnection(destination, snappedPoint, "destination");
      }

      // Handle drag
      marker.on("dragend", async () => {
        const lngLat = marker.getLngLat();
        const coords: [number, number] = [lngLat.lng, lngLat.lat];
        onDestinationChange?.(coords);
      });
    };

    updateDestination();
  }, [destination, travelMode, origin, onDestinationChange, drawConnection]);

  // Display routes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing route layers first
    const clearRoutes = () => {
      for (let i = 0; i < 3; i++) {
        const routeId = `route-${i}`;
        if (map.getLayer(routeId)) map.removeLayer(routeId);
        if (map.getLayer(`${routeId}-outline`))
          map.removeLayer(`${routeId}-outline`);
        if (map.getSource(routeId)) map.removeSource(routeId);
      }
    };

    // If no routes, just clear and return
    if (routes.length === 0) {
      if (map.loaded()) {
        clearRoutes();
      }
      return;
    }

    // Wait for map to be loaded before adding sources
    const addRoutes = () => {
      console.log(`🗺️ Adding ${routes.length} route(s) to map`);

      // Clear existing routes
      clearRoutes();

      // Add new routes
      routes.forEach((route, index) => {
        const routeId = `route-${index}`;
        const routeColor = ROUTE_COLORS[index % ROUTE_COLORS.length];
        const lineWidth = ROUTE_LINE_WIDTHS[index % ROUTE_LINE_WIDTHS.length];

        console.log(`📍 Adding route ${index + 1}:`, {
          id: routeId,
          color: routeColor,
          coordsCount: route.geometry.coordinates.length
        });

        map.addSource(routeId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: route.geometry as GeoJSON.Geometry
          }
        });

        // Outline
        map.addLayer({
          id: `${routeId}-outline`,
          type: "line",
          source: routeId,
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": lineWidth + 2,
            "line-opacity": index === activeRouteIndex ? 0.8 : 0.3
          }
        });

        // Route line
        map.addLayer({
          id: routeId,
          type: "line",
          source: routeId,
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": routeColor,
            "line-width": lineWidth,
            "line-opacity": index === activeRouteIndex ? 1 : 0.5
          }
        });
      });

      // Fit bounds to first route
      if (routes[0]) {
        const coordinates = routes[0].geometry.coordinates;
        const bounds = coordinates.reduce(
          (bounds, coord) => bounds.extend(coord as [number, number]),
          new maplibregl.LngLatBounds(
            coordinates[0] as [number, number],
            coordinates[0] as [number, number]
          )
        );

        map.fitBounds(bounds, {
          padding: {
            top: 80,
            bottom: 80,
            left: window.innerWidth < 1024 ? 20 : 360,
            right: 80
          },
          duration: 1000
        });
      }

      console.log("✅ Routes added to map successfully");
    };

    if (!map.loaded()) {
      map.once("load", addRoutes);
    } else {
      addRoutes();
    }
  }, [routes, activeRouteIndex]);

  return <div ref={mapContainer} className='w-full h-full' />;
}
