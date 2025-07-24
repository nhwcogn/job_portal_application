import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { profile } from "../Data/TalentData";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";

const ProfileUser = (props:any) => {
    const [about, setAbout] = useState('As a web developer, I specialize in building responsive and user-friendly websites using modern technologies like HTML, CSS, JavaScript, and frameworks such as React or Angular. I enjoy turning ideas into interactive, accessible, and efficient web applications.');
    const [skills, setSkills] = useState(["React", "Angular","Java", "SpringBoot", "MongoDB", "HTML", "CSS", "MySQL", "Python"]);
    const select=fields
    const [edit,setEdit]=useState([false, false, false, false, false])
    const handleEdit=(index:any)=>{
        const newEdit=[...edit];
        newEdit[index]=!newEdit[index];
        setEdit(newEdit);
    }
    return <div className="w-2/3 mx-auto">
        <div className="relative">
            <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
            <img className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src="/avatar.png" alt="" />
        </div>
        <div className="px-3 mt-16">
                <div className="text-3xl font-semibold flex justify-between">
                    Nhu Ngoc
                    <ActionIcon onClick={()=>handleEdit(0)} variant="subtle" color="brightSun.4" size="lg">
                        {edit[0]?<IconDeviceFloppy className="h-4/5 w-4/5" />:<IconPencil className="h-4/5 w-4/5"/>}
                    </ActionIcon>
                </div>
                {
                    edit[0]?<><div className="flex gap-10 [&>*]:w-1/2">
                        <SelectInput {...select[0]}/>
                        <SelectInput {...select[1]}/>
                </div>
                <SelectInput {...select[2]}/></>:<><div className="text-xl flex gap-1 items-center"> <IconBriefcase className="h-5 w-5"/> Software Developer &bull; Google</div>
                <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
                    <IconMapPin className="h-5 w-5" stroke={1.5}/> Ho Chi Minh City
                </div>
            </>
                }
            </div>    
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3 flex justify-between">About <ActionIcon onClick={()=>handleEdit(1)} variant="subtle" color="brightSun.4" size="lg">
                        {edit[1]?<IconDeviceFloppy className="h-4/5 w-4/5" />:<IconPencil className="h-4/5 w-4/5"/>}
                    </ActionIcon></div>
                    {
                        edit[1]?<Textarea value={about} placeholder="Enter about yourself..." autosize minRows={3} onChange={(event) => setAbout(event.currentTarget.value)}/>
                        :<div className="text-sm text-mine-shaft-300 text-justify">{about}</div>
                    }
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3 flex justify-between">Skills <ActionIcon onClick={()=>handleEdit(2)} variant="subtle" color="brightSun.4" size="lg">
                        {edit[2]?<IconDeviceFloppy className="h-4/5 w-4/5" />:<IconPencil className="h-4/5 w-4/5"/>}
                    </ActionIcon></div>
                    {
                        edit[2]?<TagsInput value={skills} onChange={setSkills} placeholder="Add skill" splitChars={[',', ' ', '|']}/>:
                        <div className="flex flex-wrap gap-2">
                            {
                                skills.map((skill:any, index:any) => <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>)
                            }
                        </div>
                    }
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-4 flex justify-between">Experience <ActionIcon onClick={()=>handleEdit(3)} variant="subtle" color="brightSun.4" size="lg">
                        {edit[3]?<IconDeviceFloppy className="h-4/5 w-4/5" />:<IconPencil className="h-4/5 w-4/5"/>}
                    </ActionIcon></div>
                <div className="flex flex-col gap-8">
                    {
                        profile.experience.map((exp, index) => <ExpCard key={index} {...exp} edit={edit[3]} />)
                    }
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-4 flex justify-between">Certifications <ActionIcon onClick={()=>handleEdit(4)} variant="subtle" color="brightSun.4" size="lg">
                        {edit[4]?<IconDeviceFloppy className="h-4/5 w-4/5" />:<IconPencil className="h-4/5 w-4/5"/>}
                    </ActionIcon></div>
                <div className="flex flex-col gap-8">
                    {
                        profile.certifications.map((cert:any, index:any) => <CertiCard key={index} {...cert}/>)
                    }
                </div>
            </div>
    </div>
}
export default ProfileUser;