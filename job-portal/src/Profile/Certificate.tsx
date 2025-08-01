import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import CertiInput from "./CertiInput";
import CertiCard from "./CertiCard";
import { useState } from "react";
import { useSelector } from "react-redux";

const Certificate =()=>{
    const [edit, setEdit] = useState(false);
    const [addCerti, setAddCerti]=useState(false)
    const profile = useSelector((state:any) => state.profile);
    const handleClick = () => {
        setEdit(!edit);
    }
    return <div>
        <div className="text-2xl font-semibold mb-4 flex justify-between">Certifications <div className="flex gap-2"><ActionIcon onClick={()=>setAddCerti(true)} variant="subtle" color="brightSun.4" size="lg">
            <IconPlus className="h-4/5 w-4/5"/></ActionIcon>
            <ActionIcon onClick={handleClick} variant="subtle" color={edit?"red.8":"brightSun.4"} size="lg">
            {edit?<IconX className="h-4/5 w-4/5" />:<IconPencil className="h-4/5 w-4/5"/>}
            </ActionIcon></div></div>
        <div className="flex flex-col gap-8">
            {
                profile?.certifications?.map((cert:any, index:number) => <CertiCard key={index} edit={edit} index={index} {...cert}/>)
            }
            {
                addCerti && <CertiInput setEdit={setAddCerti}/>
            }
        </div>
    </div>
}
export default Certificate;