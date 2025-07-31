import { Menu, Avatar, Switch } from '@mantine/core';
import { IconMessageCircle, IconUserCircle, IconFileText, IconMoon, IconSun, IconMoonStars, IconLogout2} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../Slices/UserSlice';

const ProfileMenu=() => {
    const dispatch = useDispatch();
    const user = useSelector((state:any)=>state.user);
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);
    const handleLogout = () => {
      dispatch(removeUser())
    }
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex items-center cursor-pointer gap-3">
            <div>{user.name}</div>
                <Avatar src="avatar.png" alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
        <Link to="/profile">
        <Menu.Item leftSection={<IconUserCircle size={14} />}>
          Profile
        </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>
          Resume
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} size="md" color="dark.4" onLabel={<IconSun size={16} stroke={2.5} color="yellow"/>} offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}/>
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;