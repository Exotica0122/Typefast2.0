import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const NavBar = () => {
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);

  const logout = async () => {
    const response = await supabase.auth.signOut();

    if (response.error) {
      return toast.error(response.error.message);
    }

    navigate("/login");
  };

  const renderAuthItems = () => {
    if (!session) {
      return (
        <Link to="/login">
          <AiOutlineUser
            className="text-neutral-500 transition-colors hover:text-white"
            size={30}
          />
        </Link>
      );
    }

    return (
      <>
        <Link to="/account">
          <AiOutlineUser
            className="text-neutral-500 transition-colors hover:text-white"
            size={30}
          />
        </Link>
        <button onClick={logout}>
          <PiSignOut
            className="text-neutral-500 transition-colors hover:text-white"
            size={30}
          />
        </button>
      </>
    );
  };

  return (
    <nav className="flex w-full items-center justify-between">
      <Link to="/">
        <h1 className="text-2xl font-semibold text-neutral-300">TypeFast</h1>
      </Link>

      <div className="flex gap-4">{renderAuthItems()}</div>
    </nav>
  );
};

export default NavBar;
