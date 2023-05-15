import { fakeUser } from "@/data/constants/fakeUser";
import { Avatar, Menu } from "@mantine/core";
import { IconArrowsRightLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function UserMenu() {
  const user = fakeUser;

  return (
    <Menu>
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden md:flex flex-col select-none">
            <span className="text-sm font-bold text-zinc-200">{user.name}</span>
            <span className="text-xs text-zinc-400">{user.email}</span>
          </div>
          <Avatar
            size={40}
            radius="xl"
            src={
              user?.imageUrl ??
              "https://source.unsplash.com/random/100x100/?abstract"
            }
          />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Usuário</Menu.Label>
        <Link href="/">
          <Menu.Item icon={<IconArrowsRightLeft size={14} />}>
            Finanças
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
}
