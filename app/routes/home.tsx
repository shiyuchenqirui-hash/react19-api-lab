import type { Route } from "./+types/home";
import { Link } from "react-router-dom";
import "../styles/home.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React 19 Demo" },
    { name: "description", content: "React 19 Features Demo" },
  ];
}

export default function Home() {
  return (
    <div className="demo-list">
      <div className="container">
        <h1 className="title">React 19 Features Demo</h1>
        <nav className="demo-nav">
          <ul className="demo-menu">
            <li className="demo-item">
              <Link to="/UseTransition" className="demo-link">
                UseTransition
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/UseActionState1" className="demo-link">
                UseActionState - Demo1
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/UseActionState2" className="demo-link">
                UseActionState - Demo2
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/FormAction" className="demo-link">
                FormAction
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/UseFormStatus" className="demo-link">
                useFormStatus
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/UseDeferredValue" className="demo-link">
                UseDeferredValue
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/UseOptimistic" className="demo-link">
                UseOptimistic
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/RefClean" className="demo-link">
                RefClean
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/Use" className="demo-link">
                Use Context
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
