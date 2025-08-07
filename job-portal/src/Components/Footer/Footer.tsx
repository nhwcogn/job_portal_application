import { IconBinoculars, IconBrandFacebook, IconBrandInstagram, IconBrandSkype } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { footerLinks } from "../../Data/Data";

const Footer = () => {
    const location= useLocation();
    return location.pathname != "/sign-up" && location.pathname != "/login" ? <div className="pt-20 pb-5 flex gap-5 justify-around bg-mine-shaft-950">
        <div className="w-1/4 flex flex-col gap-4">
            <div className="flex gap-3 items-center text-bright-sun-400">
            <IconBinoculars className="h-7 w-7" stroke={1.25}/>
            <div className="text-xl font-semibold">iJOBS</div>
        </div>
        <div className="text-sm text-mine-shaft-300">Job portal with user profiles, skill updates, certifications, work experience and admin job postings.</div>
        <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700">
            <div><IconBrandFacebook/></div>
            <div><IconBrandInstagram/></div>
            <div><IconBrandSkype/></div>
        </div>
        </div>
        {
            footerLinks.map((item, index)=> <div key={index}>
                    <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
                    {
                        item.links.map((link, idx) => <div key={idx} className="text-sm text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer mb-1">{link}</div>)
                    }
                </div>)
        }
    </div>:<></>
}
export default Footer;