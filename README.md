# NestJS Dependency Graph Example

This projects showcases a very simple NestJS module that can be plugged on a NestJS app to add visualization of its tree of modules' dependencies.

It adds the routes `/dependency-graph/index.html` for the visualization and `/dependency-graph/data` for the raw tree data.

It uses d3 for the visualization (downloaded from a CDN) and some code borrowed from [bl.ocks.org](https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd).

I'll try to make it a separate reusable Node module soon.
