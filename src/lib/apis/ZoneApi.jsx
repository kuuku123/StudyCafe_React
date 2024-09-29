const getZones = async () => {
  const raw_zones = await fetch(`${SERVER_API_URL}/getZones`, {
    credentials: "include",
    method: "GET",
  });
  console.log("raw_zones=> ", raw_zones);
  const zones_json = await raw_zones.json();
  return zones_json;
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

const ZoneApi = {
  getZones,
  addZone,
};

export default ZoneApi;
