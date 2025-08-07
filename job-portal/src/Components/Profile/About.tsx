import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const About =()=>{
    const dispatch = useDispatch();
    const profile = useSelector((state:any) => state.profile);
    const [about, setAbout] = useState("");
    const [edit, setEdit] = useState(false);
    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about)
        }else setEdit(false);
    }
    const handleSave = () => {
        setEdit(false);
        let updatedProfile = {...profile, about: about};
        dispatch(changeProfile(updatedProfile));
        successNotification("Success","About Updated Successfully!");
    }
    return <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">About <div>
        {edit &&<ActionIcon onClick={handleSave} variant="subtle" color="green.8" size="lg">
<IconCheck className="h-4/5 w-4/5" stroke={1.5}/></ActionIcon>}
        <ActionIcon onClick={handleClick} variant="subtle" color={edit?"red.8":"brightSun.4"} size="lg">
{edit?<IconX className="h-4/5 w-4/5" stroke={1.5}/>:<IconPencil className="h-4/5 w-4/5"/>}</ActionIcon>
        </div></div>
        {edit?<Textarea value={about} placeholder="Enter about yourself..." autosize minRows={2} onChange={(event) => setAbout(event.currentTarget.value)}/>
:<div className="text-sm text-mine-shaft-300 text-justify">{profile?.about}</div>
    }
</div>
}
export default About;