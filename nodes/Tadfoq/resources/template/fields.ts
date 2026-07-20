import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateGetAll = { resource: ['template'], operation: ['getAll'] };

export const templateFields: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Number',
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
