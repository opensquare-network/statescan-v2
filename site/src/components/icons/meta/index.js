export default function importIcon(iconName) {
  return import(`./${iconName}.svg`).catch();
}
