import { Button, Divider } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../Components/TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendTalent from "../Components/TalentProfile/RecommendTalent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfilePage = () => {
    const navigate = useNavigate();
    const [talents, setTalents] = useState<any[]>([]);
    useEffect(()=>{
        getAllProfiles().then((res)=>{
            setTalents(res);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 p-4">
            <Divider size="xs" mx="md" />
            <Button onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" my="sm" variant="light">Back</Button>
            <div className="flex gap-5">
                <Profile {...profile}/>
                <RecommendTalent talents ={talents} />
            </div>
        </div>
    )
}
export default TalentProfilePage;