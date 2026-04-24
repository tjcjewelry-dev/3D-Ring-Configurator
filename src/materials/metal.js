// metal.js
import { Color, MeshStandardMaterial } from "three";

export function createMetalMaterial(envMap, colorHex, options = {}) {
  const {
    roughness        = 0.35,
    metalness        = 0.95,
    emissive         = "#000000",
    emissiveIntensity = 0,
    envMapIntensity  = 1.2,
  } = options;

  return new MeshStandardMaterial({
    envMap,
    color:            new Color(colorHex),
    roughness,
    metalness,
    emissive:         new Color(emissive),
    emissiveIntensity,
    envMapIntensity,
  });
}
