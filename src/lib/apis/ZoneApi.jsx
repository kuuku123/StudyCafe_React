const getZones= async () => {
  const raw_zones= await fetch(
    `${SERVER_API_URL}/getZones`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  console.log("raw_zones=> ", raw_zones);
  const zones_json= await raw_zones.json();
  return zones_json;
};

const ZoneApi = {
  getZones,
};

export default ZoneApi;
