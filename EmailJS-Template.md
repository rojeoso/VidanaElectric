# EmailJS Template Setup for Vidana Electric Contact Form

## Template Configuration

**Service ID:** `service_9q985va`
**Template ID:** `template_ncfmkzo`
**Public Key:** `3Z9VoA_mIQaIBe3gn`

---

## Primary Email Template (To Your Business Email)

### Subject Line:
```
New Estimate Request from {{firstName}} {{lastName}}
```

### Email Body:
```
New Free Estimate Request - Vidana Electric

CONTACT INFORMATION
====================
Name: {{firstName}} {{lastName}}
Phone: {{phone}}
Email: {{email}}

SERVICE DETAILS
====================
Service Type: {{serviceType}}
Service Needed: {{service}}
Property Address: {{address}}

PROJECT DETAILS
====================
{{message}}

---
This request was submitted via the Vidana Electric website contact form.
Submitted on: {{submit_date}}
```

### Settings:
- **To Email:** Your business email address (e.g., info@vidanaelectric.com)
- **From Name:** Vidana Electric Website
- **Reply To:** {{email}}

---

## Optional: Auto-Reply Template (To Customer)

Create a second template to automatically send a confirmation to the customer.

### Subject Line:
```
Thank you for contacting Vidana Electric - Estimate Request Received
```

### Email Body:
```
Hi {{firstName}},

Thank you for requesting a free estimate from Vidana Electric!

We've received your request for:
• Service Type: {{serviceType}}
• Service: {{service}}

Our team will review your request and get back to you within 24 hours with a detailed estimate.

If you need immediate assistance or have an emergency, please call us at:
📞 254-718-2215

We're available 24/7 for emergency services.

Best regards,
Vidana Electric Team

---
With over 50 years of experience serving Central Texas
Licensed & Insured Electrical Contractors
```

### Settings:
- **To Email:** {{email}}
- **From Name:** Vidana Electric
- **Reply To:** info@vidanaelectric.com

---

## Available Form Variables

Use these variables in your EmailJS template:

| Variable | Description | Required |
|----------|-------------|----------|
| `{{firstName}}` | Customer's first name | Yes |
| `{{lastName}}` | Customer's last name | Yes |
| `{{phone}}` | Customer's phone number | Yes |
| `{{email}}` | Customer's email address | No |
| `{{serviceType}}` | Commercial or Residential | Yes |
| `{{service}}` | Specific service selected | Yes |
| `{{address}}` | Property address | No |
| `{{message}}` | Project details/description | No |

---

## Service Options Available

### Commercial Services:
- New Installations & System Upgrades
- Lighting Design, Retrofits & Maintenance
- Electrical Panel & Circuit Expansions
- Emergency Troubleshooting & Repairs
- Code Compliance & Safety Inspections

### Residential Services:
- Panel Upgrades & Circuit Expansions
- Lighting Installation (Indoor & Outdoor)
- EV Charger Installations
- Whole-Home Rewiring & Remodel Projects
- Backup Generator Systems
- Code Compliance & Safety Inspections

---

## Setup Instructions

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates**
3. Find or create template ID: `template_ncfmkzo`
4. Click **Edit Template**
5. Copy the subject line and body from above
6. Configure **To Email** to your business email
7. Set **Reply To** as `{{email}}` so you can reply directly to customers
8. Save the template
9. Test the form on your website

---

## Testing

After setup, test the form by:
1. Going to your website contact form
2. Filling out all required fields
3. Selecting a Service Type (Commercial or Residential)
4. Choosing a Service from the filtered list
5. Submitting the form
6. Check that you receive the email with all variables populated correctly

---

## Troubleshooting

If emails aren't sending:
- Verify Service ID, Template ID, and Public Key match in `.env` file
- Check EmailJS dashboard for email quota limits
- Ensure template variables match exactly (case-sensitive)
- Check browser console for JavaScript errors
- Verify form field `name` attributes match template variables

---

**Created:** 2025-10-08
**Version:** 1.0
