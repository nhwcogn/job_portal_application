import { useState } from "react";
import { ActionIcon, NumberInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import fields from "../../Data/Profile";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Info = () => {
    const select=fields;
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width: 475px)');
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            form.setValues({'jobTitle': profile.jobTitle, 'company': profile.company, 'location': profile.location, 'totalExp': profile.totalExp});
        }else setEdit(false);
    }
    const form = useForm({
        mode: 'controlled',
        initialValues: { jobTitle: '', company: '', location: '', totalExp: 1 }
    });
    const handleSave=()=>{
        setEdit(false);
            let updatedProfile = {...profile, ...form.getValues()};
            dispatch(changeProfile(updatedProfile));
            successNotification("Success","Profile Updated Successfully!");
    }
    return <>
    <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between"> {user?.name} <div>
        {edit &&<ActionIcon onClick={handleSave} variant="subtle" color="green.8" size={matches?"md":"lg"}>
        <IconCheck className="h-4/5 w-4/5" stroke={1.5}/>
        </ActionIcon>}
        <ActionIcon onClick={handleClick} variant="subtle" color={edit?"red.8":"brightSun.4"} size={matches?"md":"lg"}>
        {edit?<IconX className="h-4/5 w-4/5" stroke={1.5}/>:<IconPencil className="h-4/5 w-4/5"/>}
        </ActionIcon>
        </div></div>
        {
            edit?<><div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
                <SelectInput form={form} name="jobTitle" {...select[0]}/>
                <SelectInput form={form} name="company" {...select[1]}/>
            </div>
            <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
                <SelectInput form={form} name="location" {...select[2]}/>
                <NumberInput withAsterisk label="Experience" hideControls clampBehavior="strict" min={1} max={50} {...form.getInputProps('totalExp')} />
            </div>
            </>:
                <>
                    <div className="text-xl xs-mx:text-base flex gap-1 items-center"> <IconBriefcase className="h-5 w-5"/> {profile.jobTitle} &bull; {profile.company}</div>
                    <div className="flex gap-1 text-lg xs-mx:text-base text-mine-shaft-300 items-center">
                        <IconMapPin className="h-5 w-5" stroke={1.5}/> {profile.location}
                    </div>
                    <div className="flex gap-1 text-lg xs-mx:text-base text-mine-shaft-300 items-center">
                        <IconBriefcase className="h-5 w-5" stroke={1.5}/>Experience: {profile.totalExp} years
                    </div>
                </>
        }</>
}

export default Info;