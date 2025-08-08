import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const CertiInput=(props:any)=>{
    const dispatch = useDispatch();
    const select = fields;
    const matches = useMediaQuery('(max-width: 475px)');
    const profile = useSelector((state:any) => state.profile);
    const form = useForm({
            mode: 'controlled',
            validateInputOnChange: true,
            initialValues: { 
                name: '', 
                issuer: '', 
                issueDate: new Date(),
                certificateId: ''
            }, 
            validate:{
                name: isNotEmpty("Name is required"),
                issuer: isNotEmpty("Issuer is required"),
                issueDate: isNotEmpty("Issue date is required"),
                certificateId: isNotEmpty("Certificate ID is required"),
            }
        });
    const handleSave = () => {
        form.validate();
        if(!form.isValid()) return;
        let certi = Array.isArray(profile.certifications) ? [...profile.certifications] : [];
        certi.push(form.getValues());
        certi[certi.length - 1].issueDate = new Date(certi[certi.length - 1].issueDate).toISOString();
        let updatedProfile = {...profile, certifications: certi};
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success","Certificate Added Successfully!");
    }
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Add Certificate</div>
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
            <TextInput {...form.getInputProps("name")} label="Title" withAsterisk placeholder="Enter title"/>
            <SelectInput form={form} name="issuer" {...select[1]}/>
        </div>
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
            <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()} label="Issue date" placeholder="Pick date"/>
            <TextInput {...form.getInputProps("certificateId")} label="Certificate ID" withAsterisk placeholder="Enter ID"/>
        </div>
        <div className="flex gap-5">
            <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
            <Button color="red.8" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
        </div>
    </div>
}
export default CertiInput;
