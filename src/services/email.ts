import mailgun from "mailgun-js";
import getConfig from "@root/config";

const config = getConfig();
const mg = mailgun({
  apiKey: config.mailgunApiKey,
  domain: config.mailgunDomain,
});

export const sendEmail = async (
  data:
    | mailgun.messages.SendData
    | mailgun.messages.BatchData
    | mailgun.messages.SendTemplateData
) => {
  if (config.dev) return;

  return await mg.messages().send({
    ...data,
    from: config.emailAccount,
  });
};

export default sendEmail;
