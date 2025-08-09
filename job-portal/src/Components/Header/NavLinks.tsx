import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = () => {
    const location = useLocation();
    const accountType = useSelector((state: any) => state.user?.accountType);
    const allLinks = [
        { name: "Find Jobs", url: "/find-jobs", roles: ["EMPLOYER", "APPLICANT"] },
        { name: "Find Talent", url: "/find-talent", roles: ["EMPLOYER"] },
        { name: "Post Job", url: "/post-job/0", roles: ["EMPLOYER"] },
        { name: "Posted Job", url: "/posted-jobs/0", roles: ["EMPLOYER"] },
        { name: "Job History", url: "/job-history", roles: ["APPLICANT"] }
    ];
    const filteredLinks = accountType
        ? allLinks.filter(link => link.roles.includes(accountType))
        : [];
    if (!accountType) {
        return (
            <div className="flex bs-mx:!hidden gap-5 text-mine-shaft-300 h-full items-center">
                <span>Loading...</span>
            </div>
        );
    }
    return (
        <div className="flex bs-mx:!hidden gap-5 text-mine-shaft-300 h-full items-center">
            {filteredLinks.map((link, index) => (
                <div
                    key={index}
                    className={`${
                        location.pathname === link.url
                            ? "border-bright-sun-400 text-bright-sun-400"
                            : "border-transparent"
                    } border-t-[3px] h-full flex items-center`}
                >
                    <Link to={link.url}>{link.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default NavLinks;
