export function convertLocationForTableView(location) {
  if (!location) return {};

  const processObject = (obj) => {
    if (!obj || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
      const result = {};
      obj.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.entries(item).forEach(([key, value]) => {
            result[key] = processObject(value);
          });
        } else {
          result[index] = processObject(item);
        }
      });
      return result;
    }

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value === null) {
        result[key] = "null";
      } else if (typeof value === "object") {
        result[key] = processObject(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  };

  return processObject(location);
}

export function convertLocationForJsonView(location) {
  if (!location) return {};
  return location;
}
