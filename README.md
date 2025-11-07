# NaviGO Maps 🗺️

A modern, interactive maps application built with Next.js and MapLibre GL JS. Get directions, search locations, and navigate with ease.

## ✨ Features

- 🚗 Multi-modal routing (driving, walking, cycling)
- 📍 Location search with popular Rwanda destinations
- 🎯 Click-to-set origin and destination with interactive popups
- 🛣️ Multiple route alternatives with time and distance
- 📱 Fully responsive and mobile-friendly
- 🌍 2D/3D map views

## 🚀 Quick Start

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Set up environment:**

    ```bash
    cp .env.example .env
    ```

    Edit `.env` with your configuration:

    ```env
    NEXT_PUBLIC_MAP_STYLE_URL=http://localhost:8080/styles/osm-bright/style.json
    NEXT_PUBLIC_OSRM_API_URL=https://routing.navigo.rw
    ```

3. **Run the app:**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Maps**: MapLibre GL JS
- **Routing**: OSRM with nginx routing
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📡 OSRM Setup

The app uses OSRM with nginx routing:

```path
/{profile}/route/v1/{profile}/coordinates
```

Where `{profile}` is:

- `car` for driving
- `bike` for cycling
- `foot` for walking

Example: `https://routing.navigo.rw/bike/route/v1/bike/30.06,-1.96;30.07,-1.95?...`

## 📁 Project Structure

```tree
src/
├── app/              # Next.js pages (page.tsx, layout.tsx, not-found.tsx)
├── components/maps/  # Map components (MapContainer, MapSidebar, etc.)
├── lib/              # Utilities (map-utils.ts, constants.ts)
└── types/            # TypeScript types
```

## 📱 Usage

1. **Set origin**: Click anywhere on the map → "Set as starting point"
2. **Set destination**: Click again → "Directions to here"
3. **View routes**: Up to 3 alternative routes will appear
4. **Change travel mode**: Select driving, walking, or cycling
5. **Search locations**: Use the search bar for quick access to popular places

## 🏗️ Build for Production

```bash
npm run build
npm start
```
