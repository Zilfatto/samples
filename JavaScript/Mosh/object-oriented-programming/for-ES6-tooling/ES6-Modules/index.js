// It will throw an error "Unexpected token {".
// There is a proper way ti fix this issue using Webpack
import { Circle } from './circle';
// and change to this for the correct http request for this file
import { Circle } from './circle.js';
// Just for demo there is a quick work around. It needs to put (type="module" src="index.js") into <script> HTML element

const c = new Circle(10);
c.draw();