import Global = NodeJS.Global;

export interface App {
  init: any;
}

export interface NewGlobal extends Global {
  'example_react': App;
  'example_next': App;
  'gateway': App;
  __webpack_require__: { o: any };
}
