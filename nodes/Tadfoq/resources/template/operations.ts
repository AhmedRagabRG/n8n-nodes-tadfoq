import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplate = { resource: ['template'] };

export const templateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTemplate },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many templates for a WhatsApp number',
				action: 'Get many templates',
				routing: {
					request: {
						method: 'GET',
						url: '/api/merchant/whatsapp/templates',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'templates' },
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
];
