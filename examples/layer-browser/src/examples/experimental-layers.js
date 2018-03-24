import {
  MeshLayer,
  PathOutlineLayer,
  PathMarkerLayer,
  SolidPolygonLayer,
  Arrow2DGeometry,
  TextLayer,
  AdvancedTextLayer
} from 'deck.gl-layers';

import {COORDINATE_SYSTEM} from 'deck.gl';
import {GL} from 'luma.gl';
import dataSamples from '../immutable-data-samples';

const LIGHT_SETTINGS = {
  lightsPosition: [-122.45, 37.66, 8000, -122.0, 38.0, 8000],
  ambientRatio: 0.3,
  diffuseRatio: 0.6,
  specularRatio: 0.4,
  lightsStrength: [1, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const arrowDataLngLat = [
  {position: [-122.4111557006836, 37.774879455566406], angle: 0},
  {position: [-122.41878509521484, 37.75032043457031], angle: 70},
  {position: [-122.43194580078125, 37.75153732299805], angle: 212}
];

const MeshLayerExample = {
  layer: MeshLayer,
  props: {
    data: arrowDataLngLat,
    mesh: new Arrow2DGeometry(),
    sizeScale: 200
  }
};

const PathOutlineExample = {
  layer: PathOutlineLayer,
  // getData: () => dataSamples.zigzag,
  getData: () => dataSamples.routes,
  props: {
    id: 'path-outline-layer',
    opacity: 0.6,
    getPath: f => [f.START, f.END],
    getColor: f => [128, 0, 0],
    getZLevel: f => Math.random() * 255,
    getWidth: f => 10,
    widthMinPixels: 1,
    pickable: true,
    strokeWidth: 5,
    widthScale: 10,
    autoHighlight: true,
    highlightColor: [255, 255, 255, 255],
    parameters: {
      blendEquation: GL.MAX
    }
  }
};

const PathMarkerExample = {
  layer: PathMarkerLayer,
  getData: () => dataSamples.routes,
  props: {
    id: 'path-outline-layer',
    opacity: 0.6,
    getPath: f => [f.START, f.END],
    getColor: f => [230, 230, 230],
    getZLevel: f => Math.random() * 255,
    getWidth: f => 10,
    widthMinPixels: 1,
    pickable: true,
    strokeWidth: 5,
    widthScale: 10,
    autoHighlight: true,
    highlightColor: [255, 255, 255, 255],
    parameters: {
      blendEquation: GL.MAX
    },
    sizeScale: 200
  }
};

const coordDiff = ([lng, lat]) => [
  lng - dataSamples.positionOrigin[0],
  lat - dataSamples.positionOrigin[1]
];
const PathMarkerExampleLngLatOffset = {
  layer: PathMarkerLayer,
  getData: () => dataSamples.routes,
  props: {
    id: 'path-outline-layer',
    opacity: 0.6,
    getPath: f => [coordDiff(f.START), coordDiff(f.END)],
    getColor: f => [230, 230, 230],
    getZLevel: f => Math.random() * 255,
    getWidth: f => 10,
    widthMinPixels: 1,
    pickable: true,
    strokeWidth: 5,
    widthScale: 10,
    autoHighlight: true,
    highlightColor: [255, 255, 255, 255],
    parameters: {
      blendEquation: GL.MAX
    },
    sizeScale: 200,
    coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
    coordinateOrigin: dataSamples.positionOrigin
  }
};

const PathMarkerExampleMeterData = new Array(10).fill(true).map(f => ({
  path: [
    [Math.random() * 9000, Math.random() * 9000],
    [Math.random() * 9000, Math.random() * 9000]
  ],
  direction: {forward: Math.random() >= 0.5, backward: Math.random() >= 0.5}
}));
const PathMarkerExampleMeter = {
  layer: PathMarkerLayer,
  getData: () => PathMarkerExampleMeterData,
  props: {
    id: 'path-outline-layer-meter',
    opacity: 0.8,
    getColor: f => [230, 230, 230],
    getZLevel: f => Math.random() * 255,
    getWidth: f => 10,
    widthMinPixels: 1,
    pickable: true,
    strokeWidth: 5,
    widthScale: 10,
    autoHighlight: true,
    highlightColor: [255, 255, 255, 255],
    parameters: {
      blendEquation: GL.MAX
    },
    sizeScale: 200,
    getMarkerPercentages: () => [0.25, 0.5, 0.75],
    coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
    coordinateOrigin: dataSamples.positionOrigin
  }
};

const SolidPolygonLayerExample = {
  layer: SolidPolygonLayer,
  getData: () => dataSamples.polygons,
  props: {
    getPolygon: f => f,
    getFillColor: f => [200 + Math.random() * 55, 0, 0],
    getLineColor: f => [0, 0, 0],
    getElevation: f => Math.random() * 1000,
    opacity: 0.8,
    pickable: true,
    lightSettings: LIGHT_SETTINGS,
    elevationScale: 0.6
  }
};

const TextLayerExample = {
  layer: TextLayer,
  getData: () => dataSamples.points.slice(0, 50),
  props: {
    id: 'text-layer',
    getText: x => `${x.PLACEMENT}-${x.YR_INSTALLED}`,
    getPosition: x => x.COORDINATES,
    getColor: x => [153, 0, 0],
    getSize: x => 32,
    getAngle: x => 0,
    sizeScale: 1,
    getTextAnchor: x => 'start',
    getAlignmentBaseline: x => 'center',
    getPixelOffset: x => [10, 0]
  }
};

const AdvancedTextLayerExample = {
  layer: AdvancedTextLayer,
  getData: () => dataSamples.points.slice(0, 50),
  props: {
    id: 'text-layer',
    getText: x => `${x.PLACEMENT}-${x.YR_INSTALLED}`,
    getPosition: x => x.COORDINATES,
    getColor: x => [153, 0, 0],
    getSize: x => 32,
    getAngle: x => 0,
    sizeScale: 1,
    getTextAnchor: x => 'start',
    getAlignmentBaseline: x => 'center',
    getPixelOffset: x => [10, 0],
    fontTexture: 'http://localhost:8000/ibm2.png',
    fontInfo: 'http://localhost:8000/ibm2.json'
  }
};

const TextLayer100KExample = {
  layer: TextLayer,
  getData: dataSamples.getPoints100K,
  props: {
    id: 'text-layer-100k',
    getText: x => 'X',
    getPosition: x => x,
    getColor: x => [0, 0, 200],
    sizeScale: 1
  }
};

/* eslint-disable quote-props */
export default {
  'Experimental Layers': {
    MeshLayer: MeshLayerExample,
    PathOutlineLayer: PathOutlineExample,
    PathMarkerLayer: PathMarkerExample,
    'PathMarkerLayer (LngLat Offset)': PathMarkerExampleLngLatOffset,
    'PathMarkerLayer (Meter)': PathMarkerExampleMeter,
    'New SolidPolygonLayer': SolidPolygonLayerExample,
    TextLayer: TextLayerExample,
    AdvancedTextLayer: AdvancedTextLayerExample,
    'TextLayer (100K)': TextLayer100KExample
  }
};
