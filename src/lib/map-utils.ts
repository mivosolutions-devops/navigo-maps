import { TravelMode } from "@/types/map";

const OSRM_API_URL = process.env.NEXT_PUBLIC_OSRM_API_URL || "http://localhost:8090";

// Map travel modes to OSRM profile names
const OSRM_PROFILES: Record<TravelMode, string> = {
  driving: "car",
  walking: "foot",
  cycling: "bike"
};

/**
 * Find nearest road point using OSRM nearest service
 */
export async function findNearestRoad(
  coordinates: [number, number],
  travelMode: TravelMode
): Promise<[number, number] | null> {
  try {
    const [lng, lat] = coordinates;
    const profile = OSRM_PROFILES[travelMode];
    // Nginx routing: /{profile}/nearest/v1/{profile}/...
    const url = `${OSRM_API_URL}/${profile}/nearest/v1/${profile}/${lng},${lat}?number=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.code === "Ok" && data.waypoints && data.waypoints.length > 0) {
      const waypoint = data.waypoints[0];
      return [waypoint.location[0], waypoint.location[1]];
    }
  } catch (error) {
    console.error("Error finding nearest road:", error);
  }
  return null;
}

/**
 * Generate curved path coordinates using quadratic Bezier curve
 */
export function generateCurvedPath(
  fromCoords: [number, number],
  toCoords: [number, number],
  numPoints: number = 20
): [number, number][] {
  // Calculate midpoint
  const midLng = (fromCoords[0] + toCoords[0]) / 2;
  const midLat = (fromCoords[1] + toCoords[1]) / 2;

  // Calculate perpendicular direction for curve control point
  const dx = toCoords[0] - fromCoords[0];
  const dy = toCoords[1] - fromCoords[1];
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Create a control point offset perpendicular to the line
  const perpendicularX = -dy / distance;
  const perpendicularY = dx / distance;

  // Control point offset (adjust multiplier for curve intensity)
  const curveIntensity = distance * 0.3; // 30% of the distance
  const controlLng = midLng + perpendicularX * curveIntensity;
  const controlLat = midLat + perpendicularY * curveIntensity;

  // Generate points along the quadratic Bezier curve
  const points: [number, number][] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    // Quadratic Bezier formula: (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
    const lng =
      (1 - t) * (1 - t) * fromCoords[0] +
      2 * (1 - t) * t * controlLng +
      t * t * toCoords[0];
    const lat =
      (1 - t) * (1 - t) * fromCoords[1] +
      2 * (1 - t) * t * controlLat +
      t * t * toCoords[1];
    points.push([lng, lat]);
  }

  return points;
}

/**
 * Calculate routes between two points
 */
export async function calculateRoutes(
  origin: [number, number],
  destination: [number, number],
  travelMode: TravelMode
) {
  const profile = OSRM_PROFILES[travelMode];
  
  // Nginx routing: /{profile}/route/v1/{profile}/...
  const url = `${OSRM_API_URL}/${profile}/route/v1/${profile}/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?overview=full&geometries=geojson&alternatives=true&steps=false&continue_straight=false`;

  console.log('🗺️ Calculating routes:', { 
    origin, 
    destination, 
    travelMode, 
    profile, 
    url 
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error('❌ OSRM API HTTP error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('📍 OSRM Response:', {
      code: data.code,
      routesCount: data.routes?.length || 0,
      waypoints: data.waypoints?.length || 0
    });
    console.log('📊 Full response:', data);

    if (data.code !== "Ok") {
      console.error("❌ OSRM returned error code:", data.code, data.message);
      return null;
    }

    if (!data.routes || data.routes.length === 0) {
      console.warn("⚠️ No routes found in response");
      return null;
    }

    // Log details about each route
    data.routes.forEach((route: any, index: number) => {
      console.log(`Route ${index + 1}:`, {
        distance: `${(route.distance / 1000).toFixed(2)} km`,
        duration: `${Math.round(route.duration / 60)} min`,
        geometry: route.geometry?.coordinates?.length || 0,
      });
    });

    const routes = data.routes.slice(0, 3); // Limit to max 3 routes
    console.log(`✅ Returning ${routes.length} route(s)`);
    return routes;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("❌ Route calculation timeout");
    } else {
      console.error("❌ Error calculating routes:", error.message || error);
    }
    return null;
  }
}
