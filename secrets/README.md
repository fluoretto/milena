<p align="center">
  <img width="500px" src="../docs/assets/logo.png" />
</p>

# Secrets

Add your secrets to this directory. They will be injected in your Docker containers by Docker Compose.

- Remove .example extensions from the files.
- Do not commit your secrets.

## File Reference

- `mysql_password.secret`: add your MySQL password in this file. That's it: your plain text password.

- `sign_private_key.secret`:

`cd` into this folder and run the following command to generate the RSA private key:

```bash
$ openssl genrsa -out sign_private_key.secret 4096
```

- `sign_public_key.secret`:

After generating your private key, extract the public key from it:

```bash
$ openssl rsa -in sign_private_key.secret -pubout > sign_public_key.secret
```

- `mailgun_apikey.secret`:

> This secret is not needed for local development. Your e-mails won't be sent anyway. Login into Redis to check for e-mail data.

Add your Mailgun API Key here in following format:

```json
{
  "MAILGUN_ACCOUNT": "Milena (or yr name) <your_mail@your_domain.com>",
  "MAILGUN_APIKEY": "Your beatiful API key goes here.",
  "MAILGUN_DOMAIN": "mailgun.fluoretto.com or your domain"
}
```
