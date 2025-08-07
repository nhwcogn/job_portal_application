import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";
import ApplyJobComp from "../Components/ApplyJob/ApplyJobComp";

const ApplyJobPage = () => {
    const navigate = useNavigate();
    const {id}= useParams();
        const [job, setJob] = useState<any>(null);
        useEffect(() => {
            window.scrollTo(0, 0);
            getJob(id).then((res) => {
                setJob(res);
            }).catch((err) => {
                console.error(err);
            });
        }, [id]);
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 p-4">
            <Divider size="xs" mb="xs"/>
                <Button mb="xs" onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">Back</Button>
            <ApplyJobComp {...job}/>
        </div>
    )
}
export default ApplyJobPage;