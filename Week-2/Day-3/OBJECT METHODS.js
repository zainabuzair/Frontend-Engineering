const systemConfig = {
  env: "production",
  version: "2.4.0",
  debug: false,
};

const keys = Object.keys(systemConfig); 
const values = Object.values(systemConfig); 
const entries = Object.entries(systemConfig); 
const transformedConfig = Object.fromEntries(
  entries.map(([key, val]) => [key.toUpperCase(), val])
);


const frozenConfig = Object.freeze({ ...systemConfig });