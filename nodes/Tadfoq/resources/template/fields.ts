import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateGetAll = { resource: ['template'], operation: ['getAll'] };

export const templateFields: INodeProperties[] = [
	{
		displayName: 'Number Name or ID',
		name: 'numberId',
		type: 'options',
		required: true,
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getWhatsAppNumbers',
		},
		displayOptions: { show: showOnlyForTemplateGetAll },
		routing: {
			send: { type: 'query', property: 'number_id' },
		},
	},
];
