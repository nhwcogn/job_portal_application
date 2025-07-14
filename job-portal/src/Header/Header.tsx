import { Avatar, Indicator } from "@mantine/core";
import { IconBell, IconBinoculars, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
    const location= useLocation();
    return location.pathname != "/sign-up" && location.pathname != "/login" ? <div className="w-full bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center bg-mine-shaft-950">
        <div className="flex gap-3 items-center text-bright-sun-400">
            <IconBinoculars className="h-10 w-10" stroke={1.25}/>
            <div className="text-3xl font-semibold">iJOBS</div>
        </div>
        {NavLinks()}
        <div className=" flex gap-3 items-center">
            <ProfileMenu/>
            <div className="bg-mine-shaft-900 rounded-full p-1.5">
            <IconSettings stroke={1.5} />
            </div>
            <div className="bg-mine-shaft-900 rounded-full p-1.5">
            <Indicator color="brightSun.4" offset={6} size={8} processing>
                <IconBell stroke={1.5}/>
            </Indicator>
            </div>
        </div>
    </div>:<></>
}
export default Header;