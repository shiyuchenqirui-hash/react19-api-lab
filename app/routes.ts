import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("UseTransition", "routes/UseTransition/page.tsx"),
  route("UseActionState1", "routes/UseActionState/demo1.tsx"),
  route("UseActionState2", "routes/UseActionState/demo2.tsx"),
  route("FormAction", "routes/FormAction/page.tsx"),
  route("UseFormStatus", "routes/UseFormStatus/page.tsx"),
  route("UseDeferredValue", "routes/UseDeferredValue/page.tsx"),
  route("UseOptimistic", "routes/UseOptimistic/page.tsx"),
  route("RefClean", "routes/RefClean/page.tsx"),
  route("Use", "routes/Use/demo1.tsx"),
] satisfies RouteConfig;
