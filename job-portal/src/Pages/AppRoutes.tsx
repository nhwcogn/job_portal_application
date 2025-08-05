import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "../Header/Header"
import { Divider } from "@mantine/core"
import Footer from "../Footer/Footer"
import FindJobs from "./FindJobs"
import FindTalentPage from "./FindTalentPage"
import JobDescPage from "./JobDescPage"
import ApplyJobPage from "./ApplyJobPage"
import PostJobPage from "./PostJobPage"
import PostedJobPage from "./PostedJobPage"
import JobHistoryPage from "./JobHistoryPage"
import TalentProfilePage from "./TalentProfilePage"
import CompanyPage from "./CompanyPage"
import SignUpPage from "./SignUpPage"
import ProfilePage from "./ProfilePage"
import HomePage from "./HomePage"
import { useSelector } from "react-redux"

const AppRoutes = () => {
    const user = useSelector((state: any) => state.user);
    return <BrowserRouter>
      <div className='relative'>
      <Header/>
      <Divider size="xs" mx="md" />
      <Routes>
        <Route path='/find-jobs' element={<FindJobs/>} />
        <Route path='/find-talent' element={<FindTalentPage/>} />
        <Route path='/jobs/:id' element={<JobDescPage/>} />
        <Route path='/apply-job/:id' element={<ApplyJobPage/>} />
        <Route path='/post-job/:id' element={<PostJobPage/>} />
        <Route path='/posted-jobs/:id' element={<PostedJobPage/>} />
        <Route path='/job-history' element={<JobHistoryPage/>} />
        <Route path='/talent-profile/:id' element={<TalentProfilePage/>} />
        <Route path='/company/:name' element={<CompanyPage/>} />
        <Route path='/sign-up' element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path='/login' element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='*' element={<HomePage/>} />
      </Routes>
      <Footer/>
      </div>
      </BrowserRouter>
}
export default AppRoutes;