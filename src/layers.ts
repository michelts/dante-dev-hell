export enum Layers {
  NotStarted = "ns",
  Game = "gp",
  GameOver = "go",
  Complete = "cp",
}

export function toggleLayer(activeLayer: Layers): void {
  Object.values(Layers).forEach((layer) => {
    console.log("Toggle layer", layer, activeLayer);
    document.getElementById(layer).style.visibility =
      layer === activeLayer ? "visible" : "hidden";
  });
}
