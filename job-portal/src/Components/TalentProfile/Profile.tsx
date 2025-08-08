import { Avatar, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../Services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const Profile = (props:any) => {
    const {id} = useParams();
    const [profile, setProfile] = useState<any>({})
    const matches = useMediaQuery('(max-width: 475px)');
    useEffect(()=>{
        getProfile(id).then((res)=>{
            setProfile(res);
        }).catch((err)=>{
            console.log(err)
        })
    })
    return <div className="w-2/3 lg-mx:w-full">
        <div className="relative">
            <img className="rounded-t-2xl xl-mx:h-40 w-full xs-mx:h-32" src="/Profile/banner.jpg" alt="" />
            <div className="absolute flex items-center justify-center -bottom-1/3 left-6 md-mx:bottom-10 sm-mx:-bottom-16">
                <Avatar className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 border-mine-shaft-950 border-8 rounded-full sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32" src={profile?.picture?`data:image/jpeg;base64,${profile?.picture}`:"Avatar.png"} alt=""/>
            </div>
        </div>
        <div className="px-3 mt-16">
                <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between">{profile?.name}<Button size={matches?"sm":"md"} color="brightSun.4" variant="light">Message</Button></div>
                <div className="text-xl xs-mx:text-base flex gap-1 items-center"> <IconBriefcase className="h-5 w-5" stroke={1.5}/> {profile?.jobTitle} &bull; {profile?.company}</div>
                <div className="flex gap-1 text-lg xs-mx:text-base text-mine-shaft-300 items-center">
                    <IconMapPin className="h-5 w-5" stroke={1.5}/> {profile?.location}
                </div>
                <div className="flex gap-1 text-lg xs-mx:text-base text-mine-shaft-300 items-center">
                    <IconBriefcase className="h-5 w-5" stroke={1.5}/>Experience: {profile?.totalExp} years
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">About</div>
                <div className="text-sm text-mine-shaft-300 text-justify">{profile?.about}</div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        profile?.skills?.map((skill:any, index:any) => <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>)
                    }
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Experience</div>
                <div className="flex flex-col gap-8">
                    {
                        profile?.experience?.map((exp:any, index:any) => <ExpCard key={index} {...exp}/>)
                    }
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Certifications</div>
                <div className="flex flex-col gap-8">
                    {
                        profile?.certifications?.map((cert:any, index:any) => <CertiCard key={index} {...cert}/>)
                    }
                </div>
            </div>
    </div>
}
export default Profile;