import { Avatar, Burger, Button, Drawer, Indicator } from "@mantine/core";
import { IconBell, IconBinoculars, IconSettings, IconX } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProfile } from "../../Slices/ProfileSlice";
import { getProfile } from "../../Services/ProfileService";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slices/UserSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";

const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Job", url: "/post-job/0" },
    { name: "Posted Job", url: "/posted-jobs/0" },
    { name: "Job History", url: "/job-history" }
];
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user);
    const token = useSelector((state:any)=> state.jwt)
    const location= useLocation();
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(()=>{
        setupResponseInterceptor(navigate)
    }, [navigate])
    useEffect(()=>{
        
        if(token!=""){
            const decoded = jwtDecode(localStorage.getItem("token")||"");
            dispatch(setUser({...decoded, email:decoded.sub}));
        }
        getProfile(user?.profileId).then((res)=>{
            dispatch(setProfile(res));
        }).catch((err)=>{
            console.log(err);
        })
    }, [token, navigate])
    return location.pathname != "/sign-up" && location.pathname != "/login" ? <div className="w-full bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center bg-mine-shaft-950">
        <div className="flex gap-3 items-center text-bright-sun-400">
            <IconBinoculars className="h-10 w-10" stroke={1.25}/>
            <div className=" xs-mx:hidden text-3xl font-semibold">iJOBS</div>
        </div>
        {NavLinks()}
        <div className=" flex gap-3 items-center">
            {user ? <ProfileMenu/>:<Link to="/login">
            <Button variant="subtle" color="brightSun.4">Login</Button>
            </Link>}
            {/* <div className="bg-mine-shaft-900 rounded-full p-1.5">
            <IconSettings stroke={1.5} />
            </div> */}
            {user?<NotiMenu/>:<></>}
            {

            }
            <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
            <Drawer size="xs" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} position="right" opened={opened} onClose={close} closeButtonProps={{
          icon: <IconX size={30} />,}}>
                <div className="flex flex-col gap-6 items-center">
                    {
                        links.map((link, index) => 
                    <div key={index} className="h-full flex items-center">
                        <Link className="hover:text-bright-sun-400 text-xl" key={index} to={link.url}>{link.name}</Link>
                    </div>)
                    }   
                </div>
            </Drawer>
        </div>
    </div>:<></>
}
export default Header;