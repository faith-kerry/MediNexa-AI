"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  Hospital,
  Search,
  Navigation,
  MapPin,
  Loader2,
  Star,
  RefreshCcw,
  ArrowDownCircle,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

interface HospitalData {
  id: string;
  name: string;
  address: string;
  rating: number | string;
  totalRatings: number;
  openNow: boolean | null;
  latitude: number;
  longitude: number;
  phone?: string;
}

const PAGE_SIZE = 12;export default function HospitalsPage() {
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  const [userLocation, setUserLocation] = useState<
    [number, number]
  >([-1.286389, 36.817223]);

  const [hospitals, setHospitals] = useState<
    HospitalData[]
  >([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    fetchNearbyHospitals();
  }, [userLocation]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      () => {
        setUserLocation([-1.286389, 36.817223]);
      }
    );
  };

  const fetchNearbyHospitals = async () => {
    try {
      setLoading(true);

      const [lat, lng] = userLocation;

      const response = await fetch(
        `http://localhost:5000/api/hospitals?lat=${lat}&lng=${lng}`
      );

      const data = await response.json();

      if (data.success) {
        setHospitals(data.hospitals);
      } else {
        setHospitals([]);
      }
    } catch (error) {
      console.error(error);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  const cleanHospitalName = (name: string) => {
    return name
      .replace(/,\s*Kenya$/i, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) =>
      cleanHospitalName(hospital.name)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [hospitals, search]);

  const visibleHospitals =
    filteredHospitals.slice(0, visibleCount);

  const handleSearch = () => {
    setVisibleCount(PAGE_SIZE);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const openDirections = (
    latitude: number,
    longitude: number
  ) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${latitude},${longitude}`,
      "_blank"
    );
  };return (
  <DashboardLayout>
    <div className="space-y-8">

      {/* Hero */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-500 p-8 text-white shadow-xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

          <div>
            <div className="mb-5 flex items-center gap-4">

              <div className="rounded-3xl bg-white/20 p-4 backdrop-blur">
                <Hospital size={40} />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  Nearby Hospitals
                </h1>

                <p className="mt-2 text-emerald-100">
                  Find hospitals anywhere in Kenya.
                </p>
              </div>

            </div>

            <p className="max-w-3xl leading-8 text-emerald-50">
              Search hospitals by name or use your current location to
              discover nearby healthcare facilities with directions.
            </p>

          </div>

          <div className="hidden lg:block">

            <div className="rounded-3xl bg-white/15 p-7 backdrop-blur">

              <Hospital
                size={70}
                className="mx-auto mb-3"
              />

              <h2 className="text-center text-3xl font-bold">
                {filteredHospitals.length}
              </h2>

              <p className="text-center text-emerald-100">
                Hospitals Found
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* Search */}
      <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-lg">

        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-5 top-5 text-emerald-600"
            />

            <input
              type="text"
              value={search}
              placeholder="Search hospital..."
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="w-full rounded-2xl border border-emerald-200 py-4 pl-12 pr-5 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            />

          </div>

          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
          >
            <Search size={18} />
            Search
          </button>

          <button
            onClick={fetchNearbyHospitals}
            className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 px-7 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>

        </div>

      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg">

        <MapContainer
          center={userLocation}
          zoom={13}
          style={{
            height: "500px",
            width: "100%",
          }}
        >

          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={userLocation}>
            <Popup>
              📍 Your Current Location
            </Popup>
          </Marker>

          {visibleHospitals.map((hospital) => (

            <Marker
              key={hospital.id}
              position={[
                hospital.latitude,
                hospital.longitude,
              ]}
            >
              <Popup>

                <div className="space-y-3">

                  <h3 className="font-bold">
                    {cleanHospitalName(hospital.name)}
                  </h3>

                  <p className="text-sm">
                    {hospital.address}
                  </p>

                  <button
                    onClick={() =>
                      openDirections(
                        hospital.latitude,
                        hospital.longitude
                      )
                    }
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                  >
                    Get Directions
                  </button>

                </div>

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>      {/* Hospitals */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            size={42}
            className="animate-spin text-emerald-600"
          />
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {visibleHospitals.map((hospital) => (

              <div
                key={hospital.id}
                className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="mb-5 flex items-start gap-4">

                  <div className="rounded-2xl bg-emerald-100 p-3">
                    <Hospital
                      size={24}
                      className="text-emerald-600"
                    />
                  </div>

                  <div className="flex-1">

                    <h2 className="font-bold text-slate-800">
                      {cleanHospitalName(hospital.name)}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {hospital.address}
                    </p>

                  </div>

                </div>

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1">

                    <Star
                      size={15}
                      fill="currentColor"
                      className="text-yellow-500"
                    />

                    <span className="text-sm font-semibold text-yellow-700">
                      {hospital.rating || "N/A"}
                    </span>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      hospital.openNow === true
                        ? "bg-green-100 text-green-700"
                        : hospital.openNow === false
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {hospital.openNow === true
                      ? "Open"
                      : hospital.openNow === false
                      ? "Closed"
                      : "Unknown"}
                  </span>

                </div>

                <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">

                  <MapPin
                    size={16}
                    className="text-emerald-600"
                  />

                  <span>
                    {hospital.address}
                  </span>

                </div>

                <button
                  onClick={() =>
                    openDirections(
                      hospital.latitude,
                      hospital.longitude
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Navigation size={18} />
                  Get Directions
                </button>

              </div>

            ))}

          </div>

          {visibleCount < filteredHospitals.length && (

            <div className="mt-10 flex justify-center">

              <button
                onClick={loadMore}
                className="flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                <ArrowDownCircle size={20} />
                Load More Hospitals
              </button>

            </div>

          )}

          {filteredHospitals.length === 0 && (

            <div className="rounded-3xl border border-emerald-100 bg-white py-20 text-center">

              <Hospital
                size={55}
                className="mx-auto mb-5 text-emerald-500"
              />

              <h2 className="text-2xl font-bold text-slate-800">
                No hospitals found
              </h2>

              <p className="mt-2 text-slate-500">
                Try another search or refresh your location.
              </p>

            </div>

          )}
        </>
      )}

    </div>
  </DashboardLayout>
);
}