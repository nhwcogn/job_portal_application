import { Avatar, Divider, Tabs } from "@mantine/core"
import { IconMapPin } from "@tabler/icons-react"
import AboutCompany from "./AboutCompany"
import CompanyJobs from "./CompanyJobs"
import CompanyEmployees from "./CompanyEmployees"

const Company = () => {
    
    return <div className="w-3/4">  
        <div className="relative">
                    <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                    <img className="w-36 h-36 rounded-3xl -bottom-1/4 absolute bg-mine-shaft-950 left-5 border-mine-shaft-950 border-8 p-2" src="/Icons/Google.png" alt="" />
                </div>
                <div className="px-3 mt-12">
                        <div className="text-3xl font-semibold flex justify-between">Google
                            <Avatar.Group>
                                <Avatar src="/Avatar1.png"/>
                                <Avatar src="/Avatar2.png"/>
                                <Avatar src="/Avatar3.png"/>
                                <Avatar>10k+</Avatar>
                            </Avatar.Group>
                        </div>
                        <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
                            <IconMapPin className="h-5 w-5" stroke={1.5}/> Mountain View, CA
                        </div> 
                    </div>
                    <Divider my="xl"/>
                    <div>
                        <Tabs variant="outline" radius="lg" defaultValue="about">
                            <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                                <Tabs.Tab value="about">About</Tabs.Tab>
                                <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                                <Tabs.Tab value="employees">Employees</Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="about"><AboutCompany /></Tabs.Panel>
                            <Tabs.Panel value="jobs"><CompanyJobs /></Tabs.Panel>
                            <Tabs.Panel value="employees"><CompanyEmployees /></Tabs.Panel>
                        </Tabs>
                    </div>
    </div>
}
export default Company 