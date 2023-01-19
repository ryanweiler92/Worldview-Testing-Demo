import config from "./config";

const configLayers = config.layers;

export default [
  {
    id: 0,
    name: "BlueMarble_NextGeneration",
    title: configLayers.BlueMarble_NextGeneration.title,
    active: true,
    visible: true,
    data: configLayers.BlueMarble_NextGeneration,
  },
  {
    id: 1,
    name: "VIIRS_SNPP_CorrectedReflectance_TrueColor",
    title: configLayers.VIIRS_SNPP_CorrectedReflectance_TrueColor.title,
    active: false,
    visible: false,
    data: configLayers.VIIRS_SNPP_CorrectedReflectance_TrueColor,
  },
  {
    id: 2,
    name: "Reference_Features_15m",
    title: configLayers.Reference_Features_15m.title,
    active: true,
    visible: true,
    data: configLayers.Reference_Features_15m,
  },
  {
    id: 3,
    name: "Coastlines_15m",
    title: configLayers.Coastlines_15m.title,
    active: false,
    visible: false,
    data: configLayers.Coastlines_15m,
  },
  {
    id: 4,
    name: "MODIS_Terra_L3_Land_Surface_Temp_Daily_Day_TES",
    title: configLayers.MODIS_Terra_L3_Land_Surface_Temp_Daily_Day_TES.title,
    active: false,
    visible: true,
    data: configLayers.MODIS_Terra_L3_Land_Surface_Temp_Daily_Day_TES,
  },
  {
    id: 5,
    name: "MODIS_Aqua_L3_SST_Thermal_4km_Day_Daily",
    title: configLayers.MODIS_Aqua_L3_SST_Thermal_4km_Day_Daily.title,
    active: false,
    visible: true,
    data: configLayers.MODIS_Aqua_L3_SST_Thermal_4km_Day_Daily,
  },
  {
    id: 6,
    name: "IMERG_Precipitation_Rate",
    title: configLayers.IMERG_Precipitation_Rate.title,
    active: false,
    visible: true,
    data: configLayers.IMERG_Precipitation_Rate,
  },
  {
    id: 7,
    name: "NDH_Flood_Mortality_Risks_Distribution_2000",
    title: configLayers.NDH_Flood_Mortality_Risks_Distribution_2000.title,
    active: false,
    visible: true,
    data: configLayers.NDH_Flood_Mortality_Risks_Distribution_2000,
  },
  {
    id: 8,
    name: "AIRS_Precipitation_Day",
    title: configLayers.AIRS_Precipitation_Day.title,
    active: false,
    visible: true,
    data: configLayers.AIRS_Precipitation_Day,
  },
  {
    id: 9,
    name: "HLS_L30_Nadir_BRDF_Adjusted_Reflectance",
    title: configLayers.HLS_L30_Nadir_BRDF_Adjusted_Reflectance.title + " HLSL",
    active: false,
    visible: false,
    data: configLayers.HLS_L30_Nadir_BRDF_Adjusted_Reflectance,
  },
  {
    id: 10,
    name: "HLS_S30_Nadir_BRDF_Adjusted_Reflectance",
    title: configLayers.HLS_S30_Nadir_BRDF_Adjusted_Reflectance.title + " HLSS",
    active: false,
    visible: false,
    data: configLayers.HLS_S30_Nadir_BRDF_Adjusted_Reflectance,
  },
];
