import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("UseTransitionDemo", "routes/UseTransitionDemo/page.tsx"),
  route("UseOptimisticDemo", "routes/UseOptimisticDemo/page.tsx"),
  route("demo3", "routes/demo3/page.tsx"),
] satisfies RouteConfig;
