import React, { useState } from "react";
import ChangePasswordForm from "../Components/ForgotPassword/ChangePasswordForm";
import SendResetEmailForm from "../Components/ForgotPassword/SendResetEmailForm";
import StepsForgotPasswordFlow from "../Components/ForgotPassword/StepsForgotPasswordFlow";
import Success from "../Components/ForgotPassword/Success";
import ValidateOtpComponent from "../Components/ForgotPassword/ValidateOtpComponent";

const ForgotPassword = () => {
  const [resetMailSend, setResetMailSend] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [otpAuthenticated, setOtpAuthenticated] = useState(false);
  const [passwordRestDone, setPasswordRestDone] = useState(false);

  return (
    <div className="container mx-auto">
      <div className="2xl:flex xl:flex l:flex md:flex  w-5/6 mx-auto h-full bg-white m-5 p-5 rounded-2xl ">
        {/* left section */}
        <div>
          <StepsForgotPasswordFlow />
        </div>

        {/* right section */}
        <div className="w-12/12 2xl:w-7/12 xl:w-7/12 l:w-7/12 md:w-7/12 mx-auto mb-5">
          {resetMailSend === false && (
            <SendResetEmailForm
              setUserEmailId={(email: string) => setUserEmail(email)}
              resetEmailSent={() => setResetMailSend(true)}
            />
          )}
          {resetMailSend === true && otpAuthenticated === false && (
            <ValidateOtpComponent
              userEmail={userEmail}
              OTPValidatedSignal={() => setOtpAuthenticated(true)}
            />
          )}
          {resetMailSend === true &&
            otpAuthenticated === true &&
            passwordRestDone === false && (
              <ChangePasswordForm
                passwordChangeDone={() => setPasswordRestDone(true)}
                userEmail={userEmail}
              />
            )}

          {resetMailSend === true &&
            otpAuthenticated === true &&
            passwordRestDone === true && <Success />}
          {/* <Success /> */}

          <br />
          <br />
        </div>
        <div className="mx-auto my-auto"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;

// {Id: [a0s4x0000006ZIsAAM], name: TED edu ERR try, Description: thrr, status: Open, type: Education, venue: null, eventAt: null, completeBy: 2021-01-01T04:43:00.000Z, deletedResources: [a0u4x000001PlcUAAS], newResources: []}\
