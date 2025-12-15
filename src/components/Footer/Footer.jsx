import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between text-sm">
          <p>© 2025 CoolBlog</p>
          <div className="space-x-4">

      
            <Link to="#" className="hover:text-white">Privacy</Link>
            <Link to="#" className="hover:text-white">Terms</Link>
            <Link to="#" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    );
  }
  