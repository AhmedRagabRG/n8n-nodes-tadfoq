# n8n-nodes-tadfoq

This is an n8n community node for [Tadfoq](https://merchant.tadfoq.com). It allows you to send WhatsApp messages, retrieve linked WhatsApp numbers, and manage message templates in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Credentials](#credentials)
- [Resources & Operations](#resources--operations)
- [Usage Examples](#usage-examples)
  - [WhatsApp Number Operations](#whatsapp-number-operations)
  - [Template Operations](#template-operations)
  - [Message Operations](#message-operations)
- [Compatibility](#compatibility)
- [Resources](#resources)

---

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

In your n8n instance:
1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-tadfoq` in the **npm Package Name** field.
4. Agree to the risks and select **Install**.

---

## Credentials

To use this node, you need a **Tadfoq API Key**:

1. Log into your [Tadfoq Merchant Account](https://merchant.tadfoq.com).
2. Go to **Settings > API Access**.
3. Click **Create Key** (e.g., `n8n Integration`).
4. Copy the generated API Key (format: `tdf_live_...`). Note that secret keys are shown only once.
5. In n8n, create a new credential for **Tadfoq API** and paste your API Key.

For full API documentation, refer to the [Tadfoq Merchant API Reference](https://merchant.tadfoq.com/api/merchant/reference).

---

## Resources & Operations

### 1. WhatsApp Number (`whatsappNumber`)
- **Get Many** (`getAll`): Retrieve a list of all linked WhatsApp numbers for your merchant account.

### 2. Template (`template`)
- **Get Many** (`getAll`): Retrieve all approved WhatsApp message templates for a specified WhatsApp number.

### 3. Message (`message`)
- **Send Text** (`sendText`): Send a plain text message to a recipient.
- **Send Button** (`sendButton`): Send an interactive button message (with quick reply or call-to-action buttons).
- **Send List** (`sendList`): Send an interactive list message (with selectable options).
- **Send Template** (`sendTemplate`): Send an approved WhatsApp template message with optional variable parameters.

---

## Usage Examples

### WhatsApp Number Operations

#### Get Many (`getAll`)
Retrieve all WhatsApp numbers linked to your Tadfoq account.

* **Resource**: `WhatsApp Number`
* **Operation**: `Get Many`
* **Output**: Returns an array of linked WhatsApp numbers including phone number IDs, phone numbers, and status.

---

### Template Operations

#### Get Many (`getAll`)
Fetch approved WhatsApp message templates for a specific connected number.

* **Resource**: `Template`
* **Operation**: `Get Many`
* **WhatsApp Number ID**: Select from dropdown or pass dynamically (e.g. `{{ $json.phoneNumberId }}`)
* **Output**: Returns an array of template objects containing template names, languages, components, and approval status.

---

### Message Operations

#### 1. Send Text (`sendText`)
Send a standard text message.

* **Resource**: `Message`
* **Operation**: `Send Text`
* **WhatsApp Number ID**: Select or specify the sending WhatsApp Number ID.
* **Recipient Phone Number**: `966500000000` (E.164 format without `+`).
* **Text**: `Hello! Your order #12345 has been confirmed.`

#### 2. Send Button (`sendButton`)
Send a message with quick reply interactive buttons.

* **Resource**: `Message`
* **Operation**: `Send Button`
* **WhatsApp Number ID**: Select or specify the sending WhatsApp Number ID.
* **Recipient Phone Number**: `966500000000`
* **Body Text**: `Would you like to confirm your appointment?`
* **Buttons**:
  - Button 1 Title: `Confirm`
  - Button 2 Title: `Reschedule`

#### 3. Send List (`sendList`)
Send an interactive menu/list selection message.

* **Resource**: `Message`
* **Operation**: `Send List`
* **WhatsApp Number ID**: Select or specify the sending WhatsApp Number ID.
* **Recipient Phone Number**: `966500000000`
* **Body Text**: `Please select a service from our main menu:`
* **Button Text**: `View Menu`
* **Sections**:
  - **Section Title**: `Customer Support`
    - Option 1 ID: `opt_tech_support`, Title: `Technical Support`, Description: `Get help with technical issues`
    - Option 2 ID: `opt_billing`, Title: `Billing & Invoices`, Description: `Questions about payment`

#### 4. Send Template (`sendTemplate`)
Send a pre-approved Meta/WhatsApp template message.

* **Resource**: `Message`
* **Operation**: `Send Template`
* **WhatsApp Number ID**: Select or specify the sending WhatsApp Number ID.
* **Recipient Phone Number**: `966500000000`
* **Template**: Select from available templates (e.g., `order_update`).
* **Language Code**: `en` (or `ar`)
* **Variables / Parameters** (Optional):
  - Header parameters or Body parameters matching your template placeholders (e.g., `{{1}}` -> `Ahmed`).

---

## Compatibility

Compatible with **n8n@1.60.0** or later.

---

## Resources

* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Tadfoq API Reference](https://merchant.tadfoq.com/api/merchant/reference)
* [Tadfoq Merchant Portal](https://merchant.tadfoq.com)
