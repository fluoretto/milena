import sendEmail from "@root/services/email";

export const sendLoginCodeEmail = (email: string, code: string) => {
  const plainTextLogin = `Olá,

Aqui está o seu código de login da Fluoretto:

${code}

Ele é valido por 10 minutos.

Obrigado,
A Equipe da Fluoretto :)
`;

  const plainHtmlLogin = `
<p>Olá,</p>
<p>Aqui está o seu código de login da Fluoretto:</p>
<p><b>${code}</b></p>
<p><u>Ele é valido por 10 minutos.</u></p>
<p>Obrigado,<br/>
A Equipe da Fluoretto :)</p>
`;

  return sendEmail({
    to: email,
    subject: "Use este código para fazer login na Fluoretto",
    text: plainTextLogin,
    html: plainHtmlLogin,
  });
};
