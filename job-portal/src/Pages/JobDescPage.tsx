import { Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJob from "../JobDesc/RecommendedJob";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobDescPage = () => {
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
            <Link className="my-5 inline-block" to="/find-jobs">
                <Button leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">Back</Button>
            </Link>
            <div className="flex gap-5 justify-around">
                <JobDesc {...job} />
                <RecommendedJob />
            </div>
        </div>
    )
}
export default JobDescPage;