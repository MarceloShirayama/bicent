import UserMenu from "./user-menu";
import Welcome from "./welcome";

export default function Header() {
    return (
        <div className="
            flex justify-between items-center
            p-7 border-b border-zinc-900"
        >
            <Welcome />
            <UserMenu />
        </div>
    )
}