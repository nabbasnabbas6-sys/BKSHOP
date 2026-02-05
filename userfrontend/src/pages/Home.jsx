import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Home() {
  const { user, signOutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="navbar bg-base-100 shadow">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">BK Shop</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle btn-sm">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <span>{user?.displayName?.charAt(0) || 'U'}</span>
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profil</a>
              </li>
              <li>
                <a>Paramètres</a>
              </li>
              <li>
                <button onClick={handleLogout}>Déconnexion</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="hero min-h-[calc(100vh-100px)] bg-base-100 rounded-lg shadow-xl">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Bienvenue!</h1>
              <p className="py-6">
                Vous êtes connecté en tant que {user?.displayName}
              </p>
              <button className="btn btn-primary">
                Commencer vos achats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
