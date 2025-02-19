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
              <Link to="/UseTransitionDemo" className="demo-link">
                UseTransitionDemo
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/UseOptimisticDemo" className="demo-link">
                UseOptimisticDemo
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/UseDeferredValueDemo" className="demo-link">
                UseDeferredValueDemo
              </Link>
            </li>
            <li className="demo-item">
              <Link to="/RefCleanDemo" className="demo-link">
                RefCleanDemo
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
