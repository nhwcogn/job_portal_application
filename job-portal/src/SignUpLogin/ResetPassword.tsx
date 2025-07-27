import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";

const ResetPassword = (props:any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleSendOtp = () => {
        setOtpSending(true);
        sendOtp(email).then((res) => {
            setOtpSent(true);
            setOtpSending(false);
        }).catch((err) => {
            console.log(err);
            setOtpSending(false);
        });
    }
    const handleVerifyOtp = (otp: string) => {
        verifyOtp(email,otp).then((res) => {
            console.log(res);
            setVerified(true);
        }).catch((err) => {
            console.log(err);
        });
    }
    const resendOtp = () => {

    }
    const changeEmail = () => {
        setOtpSent(false);
    }

    const handleResetPassword = () => {
        if (password !== "") {
            // Call the API to reset the password
        }
    }

    return <Modal opened={props.opened} onClose={props.close} title="Reset Password">
        <div className="flex flex-col gap-6">
            <TextInput value={email} name="email" size="md" onChange={(e)=>setEmail(e.target.value)} withAsterisk leftSection={<IconAt size={16} />} label="Your email" placeholder="Your email"
            rightSection={<Button loading={otpSending} size="xs" className="mr-1" onClick={handleSendOtp} autoContrast disabled={email===""|| otpSent} variant="filled">Send OTP</Button>} rightSectionWidth="xl"/>
            {otpSent && <PinInput onComplete={handleVerifyOtp} length={6} className="mx-auto" size="md" type="number"/>}
            {otpSent && !verified &&
            <div className="flex gap-2">
                <Button fullWidth loading={otpSending} color="brightSun.4" onClick={resendOtp} autoContrast variant="light">Resend</Button>
                <Button fullWidth onClick={changeEmail} autoContrast disabled={email===""|| otpSent} variant="filled">Change Email</Button>

            </div>
            }
            { verified && (
                <PasswordInput
                    value={password}
                    error={passError}
                    name="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPassError(signupValidation("password", e.target.value));
                    }}
                    withAsterisk
                    leftSection={<IconLock size={16} />}
                    label="Password"
                    placeholder="Password"
                />
            )}
            {verified && <Button onClick={handleResetPassword} autoContrast variant="filled">Change Password</Button>}
        </div>
      </Modal>
}
export default ResetPassword;
