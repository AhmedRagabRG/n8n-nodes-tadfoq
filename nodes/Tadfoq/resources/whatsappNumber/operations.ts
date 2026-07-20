import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWhatsAppNumber = { resource: ['whatsappNumber'] };

export const whatsappNumberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForWhatsAppNumber },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many linked WhatsApp numbers',
				action: 'Get many whats app numbers',
				routing: {
					request: {
						method: 'GET',
						url: '/api/merchant/whatsapp/numbers',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'numbers' },
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
];
