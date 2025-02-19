import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("UseTransitionDemo", "routes/UseTransitionDemo/page.tsx"),
  route("UseOptimisticDemo", "routes/UseOptimisticDemo/page.tsx"),
  route("RefCleanDemo", "routes/RefCleanDemo/page.tsx"),
  route("UseDeferredValueDemo", "routes/UseDeferredValueDemo/page.tsx"),
] satisfies RouteConfig;
