const converter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function (value) {
    return (
      encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent,
      ) + `;path=/;`
    );
  },
};

export function setCookie(key, value) {
  if (typeof document === "undefined") {
    return;
  }
  key = encodeURIComponent(key)
    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
    .replace(/[()]/g, escape);

  return (document.cookie = key + "=" + converter.write(value, key));
}

export function getCookie(key) {
  if (typeof document === "undefined" || (arguments.length && !key)) {
    return;
  }

  // To prevent the for loop in the first place assign an empty array
  // in case there are no cookies at all.
  var cookies = document.cookie ? document.cookie.split("; ") : [];
  var jar = {};
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("=");
    var value = parts.slice(1).join("=");

    try {
      var foundKey = decodeURIComponent(parts[0]);
      jar[foundKey] = converter.read(value, foundKey);

      if (key === foundKey) {
        break;
      }
    } catch (e) {}
  }

  return key ? jar[key] : jar;
}
