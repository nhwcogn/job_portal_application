import { Button, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJob from "../JobDesc/RecommendedJob";

const JobDescPage = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 p-4">
            <Link className="my-5 inline-block" to="/find-jobs">
                <Button leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">Back</Button>
            </Link>
            <div className="flex gap-5 justify-around">
                <JobDesc />
                <RecommendedJob />
            </div>
        </div>
    )
}
export default JobDescPage;