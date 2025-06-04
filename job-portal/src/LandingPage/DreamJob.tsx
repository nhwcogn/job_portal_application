import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
    return (
        <div className="flex items-center px-16">
            <div className="flex flex-col gap-5 w-[45%] gap-3">
                <div className="text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400">Find your <span className="">dream</span> <span>job</span> with us</div>
                <div className="text-lg text-mine-shaft-200">Good Life begins with a good company. Start explore thousands of jobs in one place.</div>
                <div className="flex gap-3 mt-5">
                    <TextInput
                        className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
                        variant="unstyled"
                        label="Job Title"
                        placeholder="Software Engineer"
                    />
                    <TextInput
                        className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
                        variant="unstyled"
                        label="Type of Job"
                        placeholder="Full-time"
                    />
                    <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 rounded-lg p-2 text-mine-shaft-100 hover:bg-bright-sun-500 cursor-pointer">
                        <IconSearch className="h-[85%] w-[85%]"/>
                    </div>
                </div>
            </div>
            
            <div className="w-[55%] flex items-center justify-end">
                <div className="w-[30rem] relative">
                    <img src="/Girl.png" alt="girl" />
                    <div className="absolute -right-8 w-fit top-[50%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
                        <div className="text-center mb-1 text-sm text-mine-shaft-100">10K+ got job</div>
                        <Avatar.Group>
                            <Avatar src="avatar1.jpg" />
                            <Avatar src="avatar2.jpg" />
                            <Avatar src="avatar3.png" />
                            <Avatar>+9k</Avatar>
                        </Avatar.Group>
                    </div>
                    <div className="absolute -left-10 w-fit top-[13%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md gap-3 flex flex-col">
                        <div className="flex gap-2 items-center">
                            <div className="w-11 h-11 p-1 bg-mine-shaft-900 rounded-lg">
                                <img src="/google.png" alt="" />
                            </div>
                            <div className="text-mine-shaft-100 text-sm">
                                <div>Software Engineer</div>
                                <div className="text-mine-shaft-200 text-xs">Ho Chi Minh City</div>
                            </div>
                        </div>
                        <div className="flex gap-2 text-mine-shaft-200 text-xs">
                            <span>1 day ago</span>
                            <span>120 Applicants</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DreamJob;