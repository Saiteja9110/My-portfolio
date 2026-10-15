# Certificates Directory

Place your certificate files (PDFs or preview images) in this directory (`./assets/certs/`).

## How to add a certificate file:

1. **Copy your certificate file here**:
   - For example: `epit-internship.pdf`, `cognifyz-internship.pdf`, `aws-cloud.pdf`, `avazya-training.pdf`, or image files (`.jpg`, `.png`).

2. **Update `script.js`**:
   In `script.js`, find the `CERTIFICATES` array and update the corresponding entry's `thumbnail`, `file`, or `verificationUrl` fields:

```javascript
{
  id: 'epit',
  title: 'Internship Certificate',
  issuer: 'EPIT Research Labs Pvt. Ltd.',
  date: '2024',
  category: 'internship',
  categoryLabel: 'Internship',
  iconLabel: 'EP',
  iconClass: 'epit-c',
  description: 'Certificate of completion for a 3-month IoT, Embedded & Drone Technology Internship...',
  thumbnail: './assets/certs/epit.jpg',      // preview image if available
  file: './assets/certs/epit.pdf',           // PDF will render inside the modal viewer
  verificationUrl: 'https://example.com/verify' // optional verification link
}
```

3. **To add a completely new certificate**:
   Append a new object to the `CERTIFICATES` array with:
   - `id`: unique string (e.g. `'ccna'`)
   - `title`: title of certificate
   - `issuer`: organization name
   - `date`: year issued
   - `category`: `'internship'`, `'cloud'`, or `'training'` (matches filter buttons)
   - `categoryLabel`: Display text (e.g. `'Cloud'`)
   - `iconLabel`: 2-4 letter badge text (e.g. `'AWS'`)
   - `iconClass`: `'aws-c'`, `'epit-c'`, `'cog-c'`, or `'avz-c'`
   - `description`: certificate description
   - `thumbnail`, `file`, `verificationUrl`
