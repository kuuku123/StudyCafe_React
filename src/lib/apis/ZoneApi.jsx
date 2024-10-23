const getAllZones = async () => {
  const raw_response = await fetch(`${SERVER_API_URL}/get-all-zones`, {
    credentials: "include",
    method: "GET",
  });
  console.log("raw_all_zones=> ", raw_response);
  const all_zones_json = await raw_response.json();
  return all_zones_json;
};

const getZones = async (path) => {
  const raw_response = await fetch(
    `${SERVER_API_URL}/study/${path}/settings/zones`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  console.log("raw_get_zone => ", raw_response);
  const get_zone_json = await raw_response.json();
  return get_zone_json;
};

const addZone = async (path, zoneData) => {
  const raw_response = await fetch(
    `${SERVER_API_URL}/study/${path}/settings/zones/add`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zoneData),
    }
  );
  console.log("raw_response => ", raw_response);
  const response_json = raw_response.json();
  return response_json;
};

const removeZone = async (path, zoneData) => {
  const raw_response = await fetch(
    `${SERVER_API_URL}/study/${path}/settings/zones/remove`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zoneData),
    }
  );
  console.log("raw_response => ", raw_response);
  const response_json = raw_response.json();
  return response_json;
};

const changeZoneLabelToCity = (zones) => {
  const newZones = zones.map((zone) => ({
    city: zone.value.city,
    province: zone.value.province,
  }));
  return newZones;
};

const ZoneApi = {
  getAllZones,
  getZones,
  addZone,
  removeZone,
  changeZoneLabelToCity,
};

export default ZoneApi;
