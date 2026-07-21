import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { messageDescription } from './resources/message';
import { whatsappNumberDescription } from './resources/whatsappNumber';
import { templateDescription } from './resources/template';
import { getWhatsAppNumbers, getTemplates } from './loadOptions';

export class Tadfoq implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tadfoq',
		name: 'tadfoq',
		icon: {
			light: 'file:../../icons/logo.svg',
			dark: 'file:../../icons/logo.dark.svg',
		},
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send WhatsApp messages through Tadfoq',
		defaults: {
			name: 'Tadfoq',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'tadfoqApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://merchant.tadfoq.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Template',
						value: 'template',
					},
					{
						name: 'WhatsApp Number',
						value: 'whatsappNumber',
					},
				],
				default: 'message',
			},
			...messageDescription,
			...whatsappNumberDescription,
			...templateDescription,
		],
	};

	methods = {
		loadOptions: {
			getWhatsAppNumbers,
			getTemplates,
		},
	};
}
