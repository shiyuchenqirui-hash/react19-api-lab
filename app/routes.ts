import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("UseTransition", "routes/UseTransition/page.tsx"),
  route("UseOptimistic", "routes/UseOptimistic/page.tsx"),
  route("RefClean", "routes/RefClean/page.tsx"),
  route("UseDeferredValue", "routes/UseDeferredValue/page.tsx"),
] satisfies RouteConfig;
