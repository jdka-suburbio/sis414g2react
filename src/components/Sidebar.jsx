import { Link } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">MENÚ PRINCIPAL</h2>
      <ul className="sidebar-list">
        <li><Link to="/" class="nav-btn">Home</Link></li>
        <li><Link to="/entidad" class="nav-btn">Entidad</Link></li>
        <li><Link to="/about" class="nav-btn">About</Link></li>
      </ul>
    </aside>
  )
}

export default Sidebar
