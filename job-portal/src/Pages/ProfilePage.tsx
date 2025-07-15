import { Divider } from "@mantine/core";
import ProfileUser from "../Profile/ProfileUser";

const ProfilePage=()=>{
    return <div className="min-h-[90vh] bg-mine-shaft-950">
        <Divider mx="md" mb="xl"/>
        <ProfileUser/>
    </div>
}
export default ProfilePage;