const { renderToStaticMarkup } = require("react-dom/server");
import React from "react";
import BuzzlySignupEmail from "./buzzlysignupemail";

export function renderSignupEmail(
  personalityType: string,
  description: string
): string {
  return renderToStaticMarkup(
    <BuzzlySignupEmail
      personalityType={personalityType}
      description={description}
    />
  );
}