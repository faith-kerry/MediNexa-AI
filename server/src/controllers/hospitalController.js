const axios = require("axios");

// =========================================
// GET NEARBY HOSPITALS (OpenStreetMap)
// =========================================
exports.getHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required.",
      });
    }

    const query = `
[out:json][timeout:25];
(
  node["amenity"="hospital"](around:10000,${lat},${lng});
  way["amenity"="hospital"](around:10000,${lat},${lng});
  relation["amenity"="hospital"](around:10000,${lat},${lng});
);
out center;
`;

    const response = await axios.get(
  `https://nominatim.openstreetmap.org/search`,
  {
    params: {
      q: "hospital",
      format: "jsonv2",
      limit: 25,
      bounded: 1,
      viewbox: `${Number(lng) - 0.1},${Number(lat) + 0.1},${Number(lng) + 0.1},${Number(lat) - 0.1}`,
    },
    headers: {
      "User-Agent": "MediNexa-AI",
    },
  }
);

    const hospitals = response.data.map((hospital, index) => ({
  id: hospital.place_id || index,
  name:
    hospital.name ||
    hospital.display_name.split(",")[0] ||
    "Hospital",
  address: hospital.display_name,
  rating: "N/A",
  totalRatings: 0,
  openNow: null,
  latitude: parseFloat(hospital.lat),
  longitude: parseFloat(hospital.lon),
  phone: "",
  icon: null,
}));

    return res.status(200).json({
      success: true,
      total: hospitals.length,
      hospitals,
    });

  } catch (error) {
    console.error(
      "OpenStreetMap Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby hospitals.",
    });
  }
};