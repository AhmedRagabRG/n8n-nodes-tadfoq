import type {
	IDataObject,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

interface WhatsAppNumber {
	id: string;
	label: string;
	display_phone?: string;
}

interface TemplateItem {
	template_name: string;
	body_text: string;
	approval_status: string;
}

export async function getWhatsAppNumbers(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const options: IHttpRequestOptions = {
		method: 'GET',
		url: 'https://merchant.tadfoq.com/api/merchant/whatsapp/numbers',
		json: true,
	};

	const response = (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'tadfoqApi',
		options,
	)) as IDataObject;

	const numbers = (response.numbers as WhatsAppNumber[]) ?? [];

	return numbers.map((n) => ({
		name: n.display_phone ? `${n.label} (${n.display_phone})` : n.label,
		value: n.id,
	}));
}

export async function getTemplates(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const numberId = this.getCurrentNodeParameter('numberId') as string;

	if (!numberId) {
		return [];
	}

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: 'https://merchant.tadfoq.com/api/merchant/whatsapp/templates',
		qs: { number_id: numberId },
		json: true,
	};

	const response = (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'tadfoqApi',
		options,
	)) as IDataObject;

	const templates = (response.templates as TemplateItem[]) ?? [];

	return templates
		.filter((t) => t.approval_status === 'approved' || t.approval_status === 'APPROVED')
		.map((t) => ({
			name: t.template_name,
			value: t.template_name,
			description: t.body_text,
		}));
}
